import React from "react"
import { uniqueId } from "lodash"
import { GatsbyImage } from "gatsby-plugin-image"

import { Container, Row, Col } from "react-bootstrap"
import { useFeaturesSection } from "../../../../hooks/pageHooks/homePage/useFeaturesSection"
import "./FeaturesSection.scss"

const FeaturesSection = () => {
  const { sectionHeading, features } = useFeaturesSection()
  return (
    <div className="mbc-features-section">
      <Container>
        {sectionHeading && <h2>{sectionHeading}</h2>}
        <Row className="features-container">
          {features.length &&
            features.map(feature => (
              <Col
                key={uniqueId("feature_")}
                className="col-12 col-md-6 col-lg-3 feature"
              >
                <GatsbyImage
                  image={
                    feature.icon?.localFile?.childImageSharp?.gatsbyImageData
                  }
                  className="feature-image"
                  alt="feature image"
                />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  )
}

export default FeaturesSection
