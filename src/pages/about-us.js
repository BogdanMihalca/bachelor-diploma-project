import React from "react"

import Layout from "../components/common/Layout/Layout"
import Header from "../components/common/Header/Header"
import TopSection from "../components/pageComponents/aboutUsPage/TopSection/TopSection"
import ContentSection from "../components/pageComponents/aboutUsPage/ContentSection/ContentSection"
import VideoSection from "../components/pageComponents/aboutUsPage/VideoSection/VideoSection"
import EnumeratingSection from "../components/pageComponents/aboutUsPage/EnumeratingSection/EnumeratingSection"
import CountUpSection from "../components/pageComponents/aboutUsPage/CountUpSection/CountUpSection"
import Footer from "../components/common/Footer/Footer"

const AboutUsPage = () => {
  return (
    <Layout>
      <Header />
      <TopSection />
      <ContentSection />
      <VideoSection />
      <EnumeratingSection />
      <CountUpSection />
      <Footer />
    </Layout>
  )
}

export default AboutUsPage
