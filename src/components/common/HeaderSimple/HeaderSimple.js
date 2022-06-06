import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Container, Navbar } from "react-bootstrap"

import { useHeaderLogo } from "../../../hooks/common/Header/useHeaderLogo"
import BackButton from "../BackButton/BackButton"
import MbcLink from "../MbcLink/MbcLink"
import "./HeaderSimple.scss"

const HeaderSimple = () => {
  const { logoOnWhite } = useHeaderLogo()
  return (
    <Navbar className="mbc-header-simple" expand="lg">
      <Container>
        <Navbar.Brand>
          <div className="logo-container">
            <MbcLink link={{ url: "/" }}>
              <GatsbyImage
                className="header-logo"
                alt="logo"
                image={logoOnWhite?.localFile?.childImageSharp?.gatsbyImageData}
              />
            </MbcLink>
          </div>
        </Navbar.Brand>
        <BackButton>Inapoi</BackButton>
      </Container>
    </Navbar>
  )
}

export default HeaderSimple
