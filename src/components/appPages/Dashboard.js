import React from "react"
import Layout from "../common/Layout/Layout"
import useFirebaseContext from "../../context/useFirebaseContext"

const Dashboard = () => {
  const { signOutUser } = useFirebaseContext()
  return (
    <Layout classes="login-page">
      <button type="button" onClick={() => signOutUser()}>
        LogOut
      </button>
    </Layout>
  )
}

export default Dashboard
