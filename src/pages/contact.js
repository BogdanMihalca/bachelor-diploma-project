import React from "react"

import Layout from "../components/common/Layout/Layout"
import Header from "../components/common/Header/Header"
import Footer from "../components/common/Footer/Footer"
import TopSection from "../components/pageComponents/contactPage/TopSection/TopSection"
import FormSection from "../components/pageComponents/contactPage/FormSection/FormSection"
import ContactOptionsSection from "../components/pageComponents/contactPage/ContactOptionsSection/ContactOptionsSection"
import GoogleMapSection from "../components/pageComponents/contactPage/GoogleMapSection/GoogleMapSection"

const ContactPage = () => {
  return (
    <Layout>
      <Header />
      <TopSection />
      <FormSection />
      <ContactOptionsSection />
      <GoogleMapSection />
      <Footer />
    </Layout>
  )
}

export default ContactPage
