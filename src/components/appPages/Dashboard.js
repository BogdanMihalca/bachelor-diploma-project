import React from "react"

import Layout from "../common/Layout/Layout"

import HeaderApp from "../common/HeaderApp/HeaderApp"
import TopSection from "../pageComponents/dashboardPage/TopSection/TopSection"
import CreateNewThreadSection from "../pageComponents/dashboardPage/CreateNewThreadSection/CreateNewThreadSection"
import ThreadList from "../pageComponents/dashboardPage/ThreadList/ThreadList"

const Dashboard = () => {
  return (
    <Layout classes="dashboard-page">
      <HeaderApp />
      <TopSection />
      <CreateNewThreadSection />
      <ThreadList />
    </Layout>
  )
}

export default Dashboard
