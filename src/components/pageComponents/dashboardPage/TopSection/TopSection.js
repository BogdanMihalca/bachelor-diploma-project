import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import PageTitle from "../../../common/PageTitle/PageTitle"

import "./TopSection.scss"

const TopSection = () => {
  return (
    <Container className="mbc-dashboard-top-section">
      <Row>
        <Col lg={6}>
          <PageTitle title="Toate discutiile" />
        </Col>
        <Col lg={6} />
      </Row>
    </Container>
  )
}

export default TopSection
