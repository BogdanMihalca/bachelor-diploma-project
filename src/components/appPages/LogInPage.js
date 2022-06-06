import React from "react"
import HeaderSimple from "../common/HeaderSimple/HeaderSimple"
import Layout from "../common/Layout/Layout"
import LoginSection from "../pageComponents/loginPage/LoginSection/LoginSection"

const LogInPage = () => {
  return (
    <Layout classes="login-page">
      <HeaderSimple />
      <LoginSection />
    </Layout>
  )
}

export default LogInPage
