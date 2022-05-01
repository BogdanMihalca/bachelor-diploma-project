import React from "react"
import { Field, FormikProvider, useFormik, Form } from "formik"
import { Col, Container, Row } from "react-bootstrap"
import parse from "html-react-parser"

import { VARIANT_EMAIL } from "../../../../constants"
import MbcInput from "../../../common/MbcInput/MbcInput"
import MbcButton from "../../../common/MbcButton/MbcButton"

import "./ContactPanel.scss"
import { useContactPanel } from "../../../../hooks/pageHooks/homePage/useContactPanel"

const ContactPanel = () => {
  const { panelHeading, copy } = useContactPanel()

  // TODO: submit this email to an endpoint
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: values => {
      console.log(values)
    },
  })

  return (
    <Container className="mbc-contact-panel">
      <Row>
        <Col />
        <Col lg={10}>
          <Row className="panel-bg">
            <Col lg={6} className="d-flex flex-column justify-content-center">
              {panelHeading && <h2>{panelHeading}</h2>}
              {copy && <div className="mb-0">{parse(copy)}</div>}
            </Col>
            <Col lg={6} className="d-flex flex-column justify-content-center">
              <FormikProvider value={formik}>
                <Form
                  className="contact-panel-form"
                  onSubmit={formik.handleSubmit}
                >
                  <Field
                    component={MbcInput}
                    variant={VARIANT_EMAIL}
                    className="contact-panel-email"
                    placeholder="Email"
                    name="email"
                  />

                  <MbcButton type="submit">Trimite</MbcButton>
                </Form>
              </FormikProvider>
            </Col>
          </Row>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

export default ContactPanel
