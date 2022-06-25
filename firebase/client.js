import { getApps, initializeApp } from "firebase/app"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
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
      const user = mapUserFromFirebaseAuthToUser(userCredentials)
      onChange(user)
    } else {
      onChange(null)
    }
  })
  return unsuscribe
}

export const createNewUser = async (firebaseUser) => {
  const { profile } = getAdditionalUserInfo(firebaseUser)
  const { user } = firebaseUser
  console.log(user)
  const { uid, photoURL } = user

  const { login: userName, email, name: displayName, location } = profile
  const newUser = {
    userName,
    uid,
    email,
    photoURL,
    displayName,
    location,
    followers: [],
    following: [],
    likes: [],
  }
  return await setDoc(doc(database, "users", `${uid}`), newUser)
}

export const getUserInfoByUid = (uid) => {
  return getDoc(doc(database, "users", `${uid}`)).then((user) => {
    const userData = user.data()
    return userData
  })
}

export const loginWithGithub = async () => {
  const gitProvider = new GithubAuthProvider()
  return await signInWithPopup(auth, gitProvider)
    .then((user) => {
      const userInfo = getAdditionalUserInfo(user)
      if (!userInfo.isNewUser) {
        createNewUser(user)
      }
      const data = mapUserFromFirebaseAuthToUser(user)
      return data
    })
    .catch((err) => {
      console.error(err)
    })
}

export const addDevit = async ({ avatar, content, userId, userName, img }) => {
  try {
    return await addDoc(collection(database, "devits"), {
      avatar,
      content,
      userId,
      userName,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharesCount: 0,
      img,
    })
  } catch (error) {
    console.error(error)
  }
}

const mapDevtisFromFirebaseToDevitObject = (devitDoc) => {
  const devitData = devitDoc.data()
  const { createdAt } = devitData
  return { ...devitData, id: devitDoc.id, createdAt: +createdAt.toDate() }
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

export const fetchLatestDevits = async () => {
  try {
    const docsQuery = query(
      collection(database, "devits"),
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
