import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"
import parse from "html-react-parser"

import { useBottomSection } from "../../../../hooks/pageHooks/homePage/useBottomSection"
import "./BottomSection.scss"
import MbcButton from "../../../common/MbcButton/MbcButton"
import MbcLink from "../../../common/MbcLink/MbcLink"

const BottomSection = () => {
  const { title, copy, button, image } = useBottomSection()

  return (
    <Container className="mbc-bottom-section">
      <Row>
        <Col lg={6} className="d-flex flex-lg-column justify-content-center">
          <div className="tablet-frame">
            <GatsbyImage
              image={image?.localFile?.childImageSharp?.gatsbyImageData}
              alt="mbc tablet image"
              className="inner-image"
            />
          </div>
        </Col>
        <Col lg={6} className="right-side">
          {title && <h2>{title}</h2>}
          <div className="copy">{parse(copy)}</div>
          {button && (
            <MbcButton variant="primary">
              <MbcLink link={{ url: button.buttonLink }}>
                {button.buttonText}
              </MbcLink>
            </MbcButton>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default BottomSection
