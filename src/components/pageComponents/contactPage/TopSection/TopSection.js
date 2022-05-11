import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Col, Container, Row } from "react-bootstrap"

import { useTopSection } from "../../../../hooks/pageHooks/contactPage/useTopSection"
import PageTitle from "../../../common/PageTitle/PageTitle"

import "./TopSection.scss"
import ContentBox from "../../../common/ContentBox/ContentBox"

const TopSection = () => {
  const {
    title,
    contactpageFields: { headerImage, copy },
  } = useTopSection()
  return (
    <div className="contact-top-section">
      <GatsbyImage
        image={headerImage?.localFile?.childImageSharp?.gatsbyImageData}
        className="top-image"
        alt="mbc studOra system"
      />
      <Container>
        <Row>
          <Col lg={6}>
            <PageTitle title={title} />
            <ContentBox className="contact-copy" content={copy} />
          </Col>
          <Col lg={6} />
        </Row>
      </Container>
    </div>
  )
}

export default TopSection
