/* eslint-disable import/no-named-as-default */
import React, { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { Router } from "@gatsbyjs/reach-router"
import AOS from "aos"

import LogInPage from "../components/appPages/LogInPage"
import Profile from "../components/appPages/Profile"
import FirebaseProvider from "../context/FirebaseContext"
import AuthGuard from "../components/guards/AuthGuard"
import Dashboard from "../components/appPages/Dashboard"
import GuestGuard from "../components/guards/GuestGuard"
import NotFoundPage from "./404"

import "react-toastify/dist/ReactToastify.css"
import "aos/dist/aos.css"
import SingleThreadPage from "../components/appPages/SingleThreadPage"

const App = () => {
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  return (
    <FirebaseProvider>
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Router basepath="/app">
          <GuestGuard path="/login" component={LogInPage} />

          <AuthGuard path="/" component={Dashboard} />
          <AuthGuard path="/profile" component={Profile} />
          <AuthGuard path="/thread/:threadId" component={SingleThreadPage} />

          <NotFoundPage default />
        </Router>
      </>
    </FirebaseProvider>
  )
}

export default App
