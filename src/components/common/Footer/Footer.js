import React from "react"
import { Container } from "react-bootstrap"
import parse from "html-react-parser"

import { useFooter } from "../../../hooks/common/Footer/useFooter"
import "./Footer.scss"

const Footer = () => {
  const { footerCopyrightText } = useFooter()

  return (
    <div className="mbc-footer">
      <div className="top-footer-border" />
      <Container>
        {footerCopyrightText && (
          <div className="copyright">{parse(footerCopyrightText)}</div>
        )}
      </Container>
    </div>
  )
}

export default Footer
