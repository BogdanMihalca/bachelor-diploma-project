import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useNotFound } from "../../../hooks/pageHooks/notFoundPage/useNotFound"
import ContentBox from "../../common/ContentBox/ContentBox"
import TitleDecoration from "../../../assets/images/png/lines.png"

import "./NotFoundSection.scss"
import MbcButton from "../../common/MbcButton/MbcButton"
import MbcLink from "../../common/MbcLink/MbcLink"

const NotFoundSection = () => {
  const { title, copy, image } = useNotFound()
  return (
    <div className="not-found-section">
      <Container>
        <Row>
          <Col md={6}>
            <div className="mbc-not-found-title">
              <img src={TitleDecoration} alt="title decoration" />
              <h1>{title}</h1>
            </div>
            <ContentBox content={copy} />
            <MbcButton variant="primary" className="featured-post-read-more">
              <MbcLink link={{ url: "/" }}>Inapoi la pagina principala</MbcLink>
            </MbcButton>
          </Col>
          <Col md={6}>
            <GatsbyImage
              className="not-found-image"
              alt="not found"
              image={image?.localFile?.childImageSharp?.gatsbyImageData}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default NotFoundSection
