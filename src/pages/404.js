import React from "react"

import Layout from "../components/common/Layout/Layout"
import Seo from "../components/common/seo"
import HeaderSimple from "../components/common/HeaderSimple/HeaderSimple"
import NotFoundSection from "../components/pageComponents/notFoundPage/NotFoundSection"

const NotFoundPage = () => {
  return (
    <Layout classes="not-found-page">
      <Seo title="404: Not Found" />
      <HeaderSimple />
      <NotFoundSection />
    </Layout>
  )
}

export default NotFoundPage
