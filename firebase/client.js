import { initializeApp } from "firebase/app"
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  Timestamp,
} from "firebase/firestore"
import {
  getAuth,
  onAuthStateChanged,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCVRHfNae985X4lcSf19vz5dQU0GkLkJSY",
  authDomain: "devtter-8aa39.firebaseapp.com",
  projectId: "devtter-8aa39",
  storageBucket: "devtter-8aa39.appspot.com",
  messagingSenderId: "58590672713",
  appId: "1:58590672713:web:22d6b9ead5c8911ee54c98",
  measurementId: "G-0MGML3H4R5",
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const database = getFirestore(firebaseApp)

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
  const unsuscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const normalizedUser = mapUserFromFirebaseAuthToUser(user)
      onChange(normalizedUser)
    } else {
      onChange(null)
    }
  })
  return unsuscribe
}

export const loginWithGithub = async () => {
  const gitProvider = new GithubAuthProvider()
  return await signInWithPopup(auth, gitProvider)
    .then(mapUserFromFirebaseAuthToUser)
    .catch((err) => {
      console.error(err)
    })
}

export const addDevit = async ({ avatar, content, userId, userName }) => {
  try {
    return await addDoc(collection(database, "devits"), {
      avatar,
      content,
      userId,
      userName,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharesCount: 0,
    })
  } catch (error) {
    console.error(error)
  }
}

export const fetchLatestDevits = async () => {
  try {
    const docsQuery = await getDocs(collection(database, "devits"))
    const data = docsQuery.docs.map((doc) => {
      const docData = doc.data()
      const { createdAt } = docData
      const intl = new Intl.DateTimeFormat("en-US")
      const normalizedCreatedAt = intl.format(createdAt.seconds * 1000)
      return { ...docData, id: doc.id, createdAt: normalizedCreatedAt }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}
