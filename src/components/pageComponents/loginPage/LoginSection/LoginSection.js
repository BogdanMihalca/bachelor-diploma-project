import React, { useState } from "react"
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap"

import LoginImage from "../../../../assets/images/png/login.png"
import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm"
import "./LoginSection.scss"

const LoginSection = () => {
  const [key, setKey] = useState("login")
  return (
    <Container>
      <div className="login-card">
        <Row>
          <Col lg={6} className="login-image-container">
            <img src={LoginImage} alt="login" />
          </Col>
          <Col lg={6} className="login-container">
            <h1>Contul tau StudOra</h1>
            <Tabs
              defaultActiveKey="login"
              activeKey={key}
              onSelect={k => setKey(k)}
            >
              <Tab eventKey="login" title="LogIn">
                <LoginForm setKey={setKey} />
              </Tab>
              <Tab eventKey="inregistrare" title="Inregistrare">
                <RegisterForm setKey={setKey} />
              </Tab>
              {key === "password-reset" && (
                <Tab eventKey="password-reset" title="Resetare Parola">
                  <ResetPasswordForm />
                </Tab>
              )}
            </Tabs>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default LoginSection
