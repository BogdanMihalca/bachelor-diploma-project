/* eslint-disable no-console */
import React, { createContext, useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { getApps, initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { doc, getFirestore, setDoc } from "firebase/firestore"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth"

// Your credentials
const clientCredentials = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
}

export const FirebaseContext = createContext({
  googleAnalytics: null,
  auth: null,
  user: null,
  db: null,
  isLoading: false,
  logInWithEmailAndPassword: () => Promise.resolve(),
  sendResetPasswordEmail: () => Promise.resolve(),
  signOutUser: () => Promise.resolve(),
  getSignedInUser: () => Promise.resolve(),
  refetchSignedInUser: () => Promise.resolve(),
})

export const FirebaseProvider = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState()
  const [db, setDb] = useState()
  const [auth, setAuth] = useState()
  const [user, setUser] = useState(null)
  const [googleAnalytics, setGoogleAnalytics] = useState()
  const [googleProvider, setGoogleProvider] = useState()
  const [facebookProvider, setFacebookProvider] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const logInWithEmailAndPassword = async (email, password) => {
    setIsLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        setIsLoading(false)
        return { error: null, success: true }
      })
      .catch(error => {
        const errorMessage = error.message
        setIsLoading(false)
        return { error: errorMessage, success: false }
      })
  }

  const signUpWithEmailAndPassword = async (email, password) => {
    setIsLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false)
        return { error: null, success: true }
      })
      .catch(error => {
        const errorMessage = error.message
        setIsLoading(false)
        return { error: errorMessage, success: false }
      })
  }

  const signInWithGoogle = async () => {
    setIsLoading(true)
    return signInWithPopup(auth, googleProvider)
      .then(() => {
        setIsLoading(false)
        return { error: null, success: true }
      })
      .catch(error => {
        const errorMessage = error.message
        setIsLoading(false)
        return { error: errorMessage, success: false }
      })
  }

  const signInWithFacebook = async () => {
    setIsLoading(true)
    return signInWithPopup(auth, facebookProvider)
      .then(() => {
        setIsLoading(false)
        // The signed-in user info
        return { error: null, success: true }
      })
      .catch(error => {
        const errorMessage = error.message
        setIsLoading(false)
        return { error: errorMessage, success: false }
      })
  }

  const sendResetPasswordEmail = async email => {
    setIsLoading(true)
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false)
        return { error: null, success: true }
      })
      .catch(error => {
        const errorMessage = error.message
        setIsLoading(false)
        return { error: errorMessage, success: false }
      })
  }

  const signOutUser = () => {
    signOut(auth)
    console.log("User signed out")
  }

  useEffect(() => {
    // Initialize Firebase
    // Checks if the app is already initialized
    if (!firebaseApp && !getApps().length) {
      setIsLoading(true)
      const app = initializeApp(clientCredentials)
      // Analytics
      if ("measurementId" in clientCredentials) {
        const gAnalytics = getAnalytics(app)
        setGoogleAnalytics(gAnalytics)
      }

      setFirebaseApp(app)
      setDb(getFirestore(app))
      setAuth(getAuth())
      setGoogleProvider(new GoogleAuthProvider())
      setFacebookProvider(new FacebookAuthProvider())
      setIsLoading(false)
      // Listen authenticated user
      onAuthStateChanged(getAuth(), async currentUser => {
        if (currentUser) {
          console.log(currentUser, "User signed in")
          try {
            await setDoc(doc(getFirestore(app), "users", currentUser.uid), {
              name: currentUser.displayName,
              email: currentUser.email,
              profilePicture: currentUser.photoURL,
            })
          } catch (err) {
            console.error("writeToDB failed. reason :", err)
          }

          setUser(currentUser)
        } else {
          // User is signed out
          setUser(null)
        }
      })
    }
  }, [])

  const providerValue = useMemo(() => ({
    googleAnalytics,
    auth,
    user,
    db,
    isLoading,
    logInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    sendResetPasswordEmail,
    signInWithFacebook,
    signInWithGoogle,
    signOutUser,
  }))

  return (
    <FirebaseContext.Provider
      value={providerValue}
      displayName="Firebase Context"
    >
      {children}
    </FirebaseContext.Provider>
  )
}

FirebaseProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default FirebaseProvider
