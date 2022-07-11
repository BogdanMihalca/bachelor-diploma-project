import React from "react"

import HeaderApp from "../common/HeaderApp/HeaderApp"
import Layout from "../common/Layout/Layout"
import MessagesList from "../pageComponents/singleThreadPage/MessagesList/MessagesList"
import ThreadSummary from "../pageComponents/singleThreadPage/ThreadSummary/ThreadSummary"

const SingleThreadPage = () => {
  return (
    <Layout classes="dashboard-page">
      <HeaderApp />
      <ThreadSummary />
      <MessagesList />
    </Layout>
  )
}

export default SingleThreadPage
