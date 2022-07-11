import { navigate } from "@gatsbyjs/reach-router"
import React, { useEffect } from "react"

import useFirebaseContext from "../../context/useFirebaseContext"
import HeaderSimple from "../common/HeaderSimple/HeaderSimple"
import Layout from "../common/Layout/Layout"
import LoginSection from "../pageComponents/loginPage/LoginSection/LoginSection"

const LogInPage = () => {
  const { user } = useFirebaseContext()

  useEffect(() => {
    if (user) navigate("/app")
  }, [user])

  return (
    <Layout classes="login-page">
      <HeaderSimple />
      <LoginSection />
    </Layout>
  )
}

export default LogInPage
