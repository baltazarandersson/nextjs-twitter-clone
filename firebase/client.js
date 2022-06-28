import { getApps, initializeApp } from "firebase/app"
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore"
import {
  getAuth,
  onAuthStateChanged,
  GithubAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { fromTimeStampToDate } from "utils/fromTimestampToDate"

const firebaseConfig = {
  apiKey: "AIzaSyCVRHfNae985X4lcSf19vz5dQU0GkLkJSY",
  authDomain: "devtter-8aa39.firebaseapp.com",
  projectId: "devtter-8aa39",
  storageBucket: "devtter-8aa39.appspot.com",
  messagingSenderId: "58590672713",
  appId: "1:58590672713:web:22d6b9ead5c8911ee54c98",
  measurementId: "G-0MGML3H4R5",
}

export let firebaseApp

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig)
}

export const auth = getAuth(firebaseApp)
export const database = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

const mapUserFromFirebaseAuthToUser = (userInfo) => {
  const { displayName, email, photoURL, uid } = userInfo.user
    ? userInfo.user
    : userInfo
  return {
    userName: displayName,
    email,
    avatar: photoURL,
    uid,
  }
}

export const onAuthChange = (onChange) => {
  const unsuscribe = onAuthStateChanged(auth, (userCredentials) => {
    if (userCredentials) {
      const { uid } = userCredentials
      getUserInfoByUid(uid).then(onChange)
    } else {
      onChange(null)
    }
  })
  return unsuscribe
}

export const createNewUser = async (firebaseUser) => {
  const { profile } = getAdditionalUserInfo(firebaseUser)
  const { user } = firebaseUser
  const { uid, photoURL } = user

  const { login: userName, email, name: displayName, location } = profile
  const newUser = {
    userName,
    uid,
    email,
    avatar: photoURL,
    displayName,
    location,
    creationDate: Timestamp.fromDate(new Date()),
    followers: [],
    followersCount: 0,
    following: [],
    followingCount: 0,
    devits: [],
  }
  return await setDoc(doc(database, "users", `${uid}`), newUser)
}

export const getUserInfoByUid = (uid) => {
  return getDoc(doc(database, "users", `${uid}`)).then((user) => {
    const userData = user.data()
    return userData
  })
}

export const loginWithGithub = () => {
  const gitProvider = new GithubAuthProvider()
  return signInWithPopup(auth, gitProvider).then((user) => {
    const userInfo = getAdditionalUserInfo(user)
    if (userInfo.isNewUser) {
      createNewUser(user)
    }
    createNewUser(user)
    const data = mapUserFromFirebaseAuthToUser(user)
    return data
  })
}

export const addReplyToDevit = async (replyData, devitId) => {
  const devitRef = doc(database, "devits", `${devitId}`)
  const devitRepliesCollectionRef = collection(
    database,
    "devits",
    `${devitId}`,
    "replies"
  )

  updateDoc(doc(database, devitRef), {
    repliesCount: increment(1),
  })

  return addDoc(devitRepliesCollectionRef, {
    ...replyData,
    createdAt: Timestamp.fromDate(new Date()),
    likedBy: [],
  })
}

export const addDevit = async ({
  avatar,
  content,
  userUid,
  userName,
  displayName,
  img,
}) => {
  try {
    const devitsCollectionRef = collection(database, "devits")
    const userRef = doc(database, "users", `${userUid}`)

    const newDevitRef = await addDoc(devitsCollectionRef, {
      avatar,
      content,
      userUid,
      displayName,
      userName,
      createdAt: Timestamp.fromDate(new Date()),
      likedBy: [],
      repliesCount: 0,
      shares: [],
      img,
    })
    const devitId = newDevitRef.id

    return updateDoc(userRef, {
      devits: arrayUnion(devitId),
    })
  } catch (error) {
    console.error(error)
  }
}

const mapDevtisFromFirebaseToDevitObject = (devitDoc) => {
  const devitData = devitDoc.data()
  const { createdAt } = devitData

  return {
    ...devitData,
    id: devitDoc.id,
    createdAt: fromTimeStampToDate(createdAt),
  }
}

export const listenLatestDevitComments = (devitId, callback) => {
  const commentsQuery = query(
    collection(database, "devits", `${devitId}`, "comments"),
    orderBy("createdAt", "desc")
  )
  const unsub = onSnapshot(commentsQuery, (snapshot) => {
    const data = snapshot.docs.map(mapDevtisFromFirebaseToDevitObject)
    callback(data)
  })
  return unsub
}

export const listenLatestDevits = (callback) => {
  const devitsQuery = query(
    collection(database, "devits"),
    orderBy("createdAt", "desc")
  )
  const unsub = onSnapshot(devitsQuery, (snapshot) => {
    const data = snapshot.docs.map(mapDevtisFromFirebaseToDevitObject)
    callback(data)
  })
  return unsub
}

export const fetchLatestUserDevits = async (userUid) => {
  try {
    const docsQuery = query(
      collection(database, "devits"),
      where("userUid", "==", userUid),
      orderBy("createdAt", "desc")
    )

    return getDocs(docsQuery).then((devitsCollection) => {
      return devitsCollection.docs.map(mapDevtisFromFirebaseToDevitObject)
    })
  } catch (error) {
    console.error(error)
  }
}

export const uploadImage = (file) => {
  const imagesRef = ref(storage, `images/${file.name}`)
  const uploadTask = uploadBytesResumable(imagesRef, file)
  return uploadTask
}

export const getFileURL = (uploadTask, settter) => {
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    settter(downloadURL)
  })
}

export const likeDevit = (devitId, userUid) => {
  const devitDocRef = doc(database, "devits", `${devitId}`)

  updateDoc(devitDocRef, {
    likedBy: arrayUnion(userUid),
  })
}

export const unlikeDevit = (devitId, userUid) => {
  const devitDocRef = doc(database, "devits", `${devitId}`)

  updateDoc(devitDocRef, {
    likedBy: arrayRemove(userUid),
  })
}

export const listenToDevitChanges = (devitId, callback) => {
  const devitDocRef = doc(database, "devits", `${devitId}`)
  const unsub = onSnapshot(devitDocRef, (devit) => {
    const data = devit.data()
    const { createdAt } = data
    const devitObj = {
      ...data,
      createdAt: fromTimeStampToDate(createdAt),
      id: devitId,
    }
    callback(devitObj)
  })
  return unsub
}

export const followUser = async (followedUserUid, followerUserUid) => {
  const batch = writeBatch(database)

  const followedUserRef = doc(database, "users", `${followedUserUid}`)
  batch.update(followedUserRef, {
    followersCount: increment(1),
    followers: arrayUnion(followerUserUid),
  })

  const followerUserRef = doc(database, "users", followerUserUid)
  batch.update(followerUserRef, {
    followingCount: increment(1),
    following: arrayUnion(followedUserUid),
  })

  await batch.commit()
}

export const unfollowUser = async (followedUserUid, followerUserUid) => {
  const batch = writeBatch(database)

  const followedUserRef = doc(database, "users", `${followedUserUid}`)
  batch.update(followedUserRef, {
    followersCount: increment(-1),
    followers: arrayRemove(followerUserUid),
  })

  const followerUserRef = doc(database, "users", followerUserUid)
  batch.update(followerUserRef, {
    followingCount: increment(-1),
    following: arrayRemove(followedUserUid),
  })

  await batch.commit()
}
