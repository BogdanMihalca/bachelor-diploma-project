import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Col, Container, Row } from "react-bootstrap"

import { useTopSection } from "../../../../hooks/pageHooks/aboutUsPage/useTopSection"
import PageTitle from "../../../common/PageTitle/PageTitle"

import "./TopSection.scss"

const TopSection = () => {
  const {
    title,
    aboutusPageFileds: { headerImage },
  } = useTopSection()
  return (
    <div className="about-us-top-section">
      <GatsbyImage
        image={headerImage?.localFile?.childImageSharp?.gatsbyImageData}
        className="top-image"
        alt="mbc studOra system"
      />
      <Container>
        <Row>
          <Col lg={6}>
            <PageTitle title={title} />
          </Col>
          <Col lg={6} />
        </Row>
      </Container>
    </div>
  )
}

export default TopSection
