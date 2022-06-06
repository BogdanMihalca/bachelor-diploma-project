/* eslint-disable no-console */
import React, { createContext, useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { getApps, initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
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
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
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
      .then(userCredential => {
        // Signed in
        const { user: signedInUser } = userCredential
        setUser(signedInUser)
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
      .then(userCredential => {
        // Signed in
        const { user: signedInUser } = userCredential
        setUser(signedInUser)
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
      .then(result => {
        // The signed-in user info.
        const { user: currentUser } = result
        setUser(currentUser)
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
      .then(result => {
        setIsLoading(false)
        // The signed-in user info.
        const { user: currentUser } = result
        setUser(currentUser)
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
    // This checks if the app is already initialized
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
      onAuthStateChanged(getAuth(), currentUser => {
        if (currentUser) {
          // User is signed in, see docs for a list of available properties
          const { uid, displayName, email, photoURL } = currentUser
          setUser({ uid, displayName, email, photoURL })
          console.log("User:", user)
        } else {
          // User is signed out
          setUser(null)
          console.log("User:", user)
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
