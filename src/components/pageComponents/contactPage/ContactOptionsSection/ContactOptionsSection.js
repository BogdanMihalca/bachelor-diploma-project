import React from "react"
import { Container, Row, Col } from "react-bootstrap"

import { useContactOptionsSection } from "../../../../hooks/pageHooks/contactPage/useContactOptionsSection"
import MbcLink from "../../../common/MbcLink/MbcLink"
import "./ContactOptionsSection.scss"

const ContactOptionsSection = () => {
  const {
    phone,
    email,
    address: { label },
  } = useContactOptionsSection()

  return (
    <div className="mbc-contact-options-section">
      <Container>
        <Row className="d-fex align-items-center">
          {phone && (
            <Col md={6} lg={4}>
              <div className="mbc-contact-option">
                <MbcLink link={{ url: `tel:${phone}` }}>
                  <div
                    className="color-bg"
                    style={{
                      backgroundColor: "#18D4BD",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-telephone-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                      />
                    </svg>
                  </div>
                  <h6>{phone}</h6>
                </MbcLink>
              </div>
            </Col>
          )}
          {label && (
            <Col md={6} lg={4}>
              <div className="mbc-contact-option">
                <div
                  className="color-bg"
                  style={{
                    backgroundColor: "#E7B261",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                </div>
                <h6>{label}</h6>
              </div>
            </Col>
          )}
          {email && (
            <Col md={6} lg={4}>
              <div className="mbc-contact-option">
                <MbcLink link={{ url: `mailto:${email}` }}>
                  <div
                    className="color-bg"
                    style={{
                      backgroundColor: "#B7C0EE",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-envelope-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                    </svg>
                  </div>
                  <h6>{phone}</h6>
                </MbcLink>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default ContactOptionsSection
