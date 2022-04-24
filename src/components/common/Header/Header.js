import React, { useState } from "react"
import PropTypes from "prop-types"
import { Container, Navbar, Nav } from "react-bootstrap"
import { GatsbyImage } from "gatsby-plugin-image"

import { useHeaderMenuRight } from "../../../hooks/common/Header/useHeaderMenuRight"
import { useHeaderMenu } from "../../../hooks/common/Header/useHeaderMenu"
import { useHeaderLogo } from "../../../hooks/common/Header/useHeaderLogo"
import MenuItem from "./components/MenuItem/MenuItem"
import "./Header.scss"

const Header = ({ location }) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const menuList = useHeaderMenu()
  const menuListRight = useHeaderMenuRight()
  const logoData = useHeaderLogo()

  return (
    <Navbar className="mbc-header" expand="md" variant="light" bg="light">
      <Container>
        <Navbar.Brand>
          <div className="logo-container">
            <GatsbyImage
              className="header-logo"
              alt="logo"
              image={logoData.localFile.childImageSharp.gatsbyImageData}
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="collapsable-nav">
          <button
            type="button"
            id="nav-hamburger"
            onClick={() => {
              setHamburgerOpen(!hamburgerOpen)
            }}
            className={`${hamburgerOpen ? "open" : ""}`}
          >
            <span />
            <span />
            <span />
            <span />
          </button>
        </Navbar.Toggle>
        <Navbar.Collapse id="collapsable-nav">
          <Nav className="me-auto">
            {menuList.map(item => (
              <MenuItem menuItem={item} key={item.id} location={location} />
            ))}
          </Nav>
          <Nav>
            {menuListRight.map(item => (
              <MenuItem menuItem={item} key={item.id} location={location} />
            ))}
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
