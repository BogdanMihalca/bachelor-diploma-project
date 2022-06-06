/* eslint-disable import/no-named-as-default */
import React from "react"
import { Router } from "@gatsbyjs/reach-router"

import LogInPage from "../components/appPages/LogInPage"
import Profile from "../components/appPages/Profile"
import FirebaseProvider from "../context/FirebaseContext"
// import NotFoundPage from "./404"
import AuthGuard from "../components/guards/AuthGuard"
import Dashboard from "../components/appPages/Dashboard"
import GuestGuard from "../components/guards/GuestGuard"
import NotFoundPage from "./404"

const App = () => {
  return (
    <FirebaseProvider>
      <Router basepath="/app">
        <GuestGuard path="/login" component={LogInPage} />

        <AuthGuard path="/" component={Dashboard} />
        <AuthGuard path="/profile" component={Profile} />

        <NotFoundPage default />
      </Router>
    </FirebaseProvider>
  )
}

export default App
