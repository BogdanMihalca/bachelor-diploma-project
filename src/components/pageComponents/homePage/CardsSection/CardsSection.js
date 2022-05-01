import React from "react"
import { Container, Row, Col } from "react-bootstrap"

import { useCardsSection } from "../../../../hooks/pageHooks/homePage/useCardsSection"
import MbcCard from "../../../common/MbcCard/MbcCard"
import "./CardsSection.scss"

const CardsSection = () => {
  const { sectionHeading, cards } = useCardsSection()

  return (
    <Container className="mbc-cards-section">
      {sectionHeading && <h2>{sectionHeading}</h2>}
      <Row>
        <Col md={6} lg={4}>
          {cards && cards[0] && (
            <MbcCard
              bg="blueDark"
              icon={cards[0].icon}
              title={cards[0].title}
              copy={cards[0].copy}
            />
          )}
        </Col>
        <Col md={6} lg={4} className="pushed-down">
          {cards && cards[1] && (
            <MbcCard
              bg="blueLight"
              icon={cards[1].icon}
              title={cards[1].title}
              copy={cards[1].copy}
            />
          )}
        </Col>
        <Col md={6} lg={4}>
          {cards && cards[2] && (
            <MbcCard
              bg="orange"
              icon={cards[2].icon}
              title={cards[2].title}
              copy={cards[2].copy}
            />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default CardsSection
