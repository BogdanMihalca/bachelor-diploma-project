import React from "react"
import { uniqueId } from "lodash"
import { Col, Container, Row } from "react-bootstrap"
import CountUp from "react-countup"
import VisibilitySensor from "react-visibility-sensor"

import { useCountUpSection } from "../../../../hooks/pageHooks/aboutUsPage/useCountUpSection"
import "./CountUpSection.scss"

const CountUpSection = () => {
  const { heading, items } = useCountUpSection()
  const [isRendered, setIsRendered] = React.useState(false)

  React.useEffect(() => {
    setIsRendered(true)
  }, [])

  return (
    <div className="mbc-count-up-section">
      <Container>
        {heading && <h2>{heading}</h2>}
        {items && items.length && (
          <Row>
            {items.map(item => (
              <Col md={6} lg={4} key={uniqueId("countUp_")}>
                <div className="mbc-count-up-item">
                  <div
                    className="color-bg"
                    style={{
                      backgroundColor: item.color,
                    }}
                  >
                    {isRendered && (
                      <VisibilitySensor partialVisibility>
                        {() => (
                          <CountUp
                            end={Number(item.value)}
                            duration={2.75}
                            useEasing
                            redraw
                          />
                        )}
                      </VisibilitySensor>
                    )}
                  </div>
                  <h6>{item.label}</h6>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  )
}

export default CountUpSection
