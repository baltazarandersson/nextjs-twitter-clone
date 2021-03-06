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

export const listenUserChanges = (uid, callback) => {
  const userRef = doc(database, "users", `${uid}`)
  const unsub = onSnapshot(userRef, (snapshot) => {
    const newUserData = snapshot.data()
    callback(newUserData)
  })
  return unsub
}

export const onAuthChange = (onChange) => {
  const unsuscribe = onAuthStateChanged(auth, (userCredentials) => {
    if (userCredentials) {
      const { uid } = userCredentials
      listenUserChanges(uid, onChange)
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
    devitsLiked: [],
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

  updateDoc(devitRef, {
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

    const newDevit = await addDoc(devitsCollectionRef, {
      avatar,
      content,
      userUid,
      displayName,
      userName,
      createdAt: Timestamp.fromDate(new Date()),
      likedBy: [],
      likesCount: 0,
      repliesCount: 0,
      revits: [],
      img,
    })
    const devitId = newDevit.id

    return updateDoc(userRef, {
      devits: arrayUnion(devitId),
    })
  } catch (error) {
    console.error(error)
  }
}

export const deleteDevit = async (devitId, userUid) => {
  const batch = writeBatch(database)

  const devitToDelteRef = doc(database, "devits", `${devitId}`)
  batch.delete(devitToDelteRef)

  const userDevitsRef = doc(database, "users", `${userUid}`)
  batch.update(userDevitsRef, {
    devits: arrayRemove(devitId),
  })

  await batch.commit()
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

export const listenLatestDevitReplies = (devitId, callback) => {
  const repliesQuery = query(
    collection(database, "devits", `${devitId}`, "replies"),
    orderBy("createdAt", "desc")
  )
  const unsub = onSnapshot(repliesQuery, (snapshot) => {
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

export const listenLatestUserDevits = (userUid, callback) => {
  const docsQuery = query(
    collection(database, "devits"),
    where("userUid", "==", userUid),
    orderBy("createdAt", "desc")
  )

  const unsub = onSnapshot(docsQuery, (snapshot) => {
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

export const listenLatestFollowedUsersDevits = (followedUsers, onChange) => {
  const docsQuery = query(
    collection(database, "devits"),
    where("userUid", "in", followedUsers),
    orderBy("createdAt", "desc")
  )

  const unsub = onSnapshot(docsQuery, (querySnapshot) => {
    const devitsList = querySnapshot.docs.map(
      mapDevtisFromFirebaseToDevitObject
    )
    onChange(devitsList)
  })

  return unsub
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

export const likeDevit = async (devitId, userUid) => {
  const batch = writeBatch(database)

  const devitDocRef = doc(database, "devits", `${devitId}`)
  batch.update(devitDocRef, {
    likedBy: arrayUnion(userUid),
    likesCount: increment(1),
  })

  const userDocRef = doc(database, "users", `${userUid}`)
  batch.update(userDocRef, {
    devitsLiked: arrayUnion(devitId),
  })

  batch.commit()
}

export const unlikeDevit = (devitId, userUid) => {
  const batch = writeBatch(database)

  const devitDocRef = doc(database, "devits", `${devitId}`)
  batch.update(devitDocRef, {
    likedBy: arrayRemove(userUid),
    likesCount: increment(-1),
  })

  const userDocRef = doc(database, "users", `${userUid}`)
  batch.update(userDocRef, {
    devitsLiked: arrayRemove(devitId),
  })

  batch.commit()
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
