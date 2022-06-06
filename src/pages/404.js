import React from "react"

import Layout from "../components/common/Layout/Layout"
import HeaderSimple from "../components/common/HeaderSimple/HeaderSimple"
import NotFoundSection from "../components/pageComponents/notFoundPage/NotFoundSection"

const NotFoundPage = () => {
  return (
    <Layout classes="not-found-page">
      <HeaderSimple />
      <NotFoundSection />
    </Layout>
  )
}

export default NotFoundPage
