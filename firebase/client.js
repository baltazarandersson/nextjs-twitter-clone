import { initializeApp } from "firebase/app"
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

const mapUserFromFirebaseAuthToUser = (userInfo) => {
  const { displayName, email, photoURL } = userInfo.user
    ? userInfo.user
    : userInfo
  return {
    username: displayName,
    email,
    avatar: photoURL,
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
