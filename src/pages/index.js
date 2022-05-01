import React from "react"

import Header from "../components/common/Header/Header"
import Layout from "../components/common/Layout/Layout"
import TopSection from "../components/pageComponents/homePage/TopSection/TopSection"
import FeaturesSection from "../components/pageComponents/homePage/FeaturesSection/FeaturesSection"
import ContactPanel from "../components/pageComponents/homePage/ContactPanel/ContactPanel"
import CardsSection from "../components/pageComponents/homePage/CardsSection/CardsSection"
import BottomSection from "../components/pageComponents/homePage/BottomSection/BottomSection"
import Footer from "../components/common/Footer/Footer"

const IndexPage = () => {
  return (
    <Layout classes="background-home">
      <Header />
      <TopSection />
      <FeaturesSection />
      <ContactPanel />
      <CardsSection />
      <BottomSection />
      <Footer />
    </Layout>
  )
}

export default IndexPage
