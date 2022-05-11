import React from "react"
import { uniqueId } from "lodash"
import { GatsbyImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"

import ContentBox from "../../../common/ContentBox/ContentBox"
import "./EnumeratingSection.scss"
import { useEnumeratingSection } from "../../../../hooks/pageHooks/aboutUsPage/useEnumeratingSection"
import EnumeratingItem from "./EnumeratingItem"

const EnumeratingSection = () => {
  const { heading, image, copy, items } = useEnumeratingSection()
  return (
    <Container id="enumSection">
      <Row className="mbc-enumerating-section">
        <Col lg={6} className="d-flex flex-column justify-content-center">
          {heading && <h2>{heading}</h2>}
          <ContentBox content={copy} />
          {items && items.length > 0 && (
            <Row>
              {items.map((item, i) => (
                <EnumeratingItem
                  key={uniqueId("enumerating_")}
                  title={item.title}
                  color={item.color}
                  copy={item.copy}
                  index={i}
                />
              ))}
            </Row>
          )}
        </Col>
        <Col lg={6} className="d-flex flex-column justify-content-center">
          <GatsbyImage
            image={image?.localFile?.childImageSharp?.gatsbyImageData}
            alt="mbc studOra system"
          />
        </Col>
      </Row>
    </Container>
  )
}

export default EnumeratingSection
