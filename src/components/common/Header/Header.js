/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react"
import PropTypes from "prop-types"
import { Container, Navbar, Nav } from "react-bootstrap"
import { GatsbyImage } from "gatsby-plugin-image"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

import { useHeaderMenuRight } from "../../../hooks/common/Header/useHeaderMenuRight"
import { useHeaderMenu } from "../../../hooks/common/Header/useHeaderMenu"
import { useHeaderLogo } from "../../../hooks/common/Header/useHeaderLogo"
import MenuItem from "./components/MenuItem/MenuItem"
import "./Header.scss"
import MbcButton from "../MbcButton/MbcButton"

const Header = ({ location }) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const menuList = useHeaderMenu()
  const menuListRight = useHeaderMenuRight()
  const { logoOnDark, logoOnWhite } = useHeaderLogo()

  const breakpoints = useBreakpoint()

  const logoOnDarkData = logoOnDark?.localFile?.childImageSharp?.gatsbyImageData
  const logoOnWhiteData =
    logoOnWhite?.localFile?.childImageSharp?.gatsbyImageData

  return (
    <Navbar className="mbc-header" expand="lg">
      <Container>
        <Navbar.Brand>
          <div className="logo-container">
            <GatsbyImage
              className="header-logo"
              alt="logo"
              image={breakpoints.md ? logoOnDarkData : logoOnWhiteData}
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="collapsable-nav">
          <div
            type="button"
            id="nav-hamburger"
            onClick={() => {
              setHamburgerOpen(!hamburgerOpen)
            }}
            role="button"
            tabIndex={-1}
            className={`${hamburgerOpen ? "open" : ""}`}
          >
            <span />
            <span />
            <span />
            <span />
          </div>
        </Navbar.Toggle>
        <Navbar.Collapse id="collapsable-nav">
          <Nav className="me-auto">
            {menuList.map(item => (
              <MenuItem menuItem={item} key={item.id} location={location} />
            ))}
          </Nav>
          <Nav className="login-buttons">
            <MenuItem
              menuItem={menuListRight[0]}
              key={menuListRight[0].id}
              location={location}
            />
            <MenuItem
              menuItem={menuListRight[1]}
              key={menuListRight[1].id}
              location={location}
              component={MbcButton}
              className="primary"
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

Header.defaultProps = {
  location: {},
}

Header.propTypes = {
  location: PropTypes.shape({}),
}

export default Header
