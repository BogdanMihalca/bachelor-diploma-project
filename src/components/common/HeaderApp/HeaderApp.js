import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Container, Navbar, NavDropdown } from "react-bootstrap"

import { useHeaderLogo } from "../../../hooks/common/Header/useHeaderLogo"
import profilePlaceholder from "../../../assets/images/png/profile_placeholder.png"
import useFirebaseContext from "../../../context/useFirebaseContext"
import MbcLink from "../MbcLink/MbcLink"

import "./HeaderApp.scss"

const HeaderApp = () => {
  const { logoOnWhite } = useHeaderLogo()
  const { signOutUser, user } = useFirebaseContext()

  return (
    <Navbar className="mbc-header-app" expand="lg">
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
        <NavDropdown
          title={
            <span className="d-inline-flex align-items-center profile-button">
              <img
                className="profile-img"
                src={user.photoURL || profilePlaceholder}
                alt="profile"
                referrerPolicy="no-referrer"
              />
              <h4>{user.displayName || user.email}</h4>
            </span>
          }
          id="nav-dropdown"
          width="50%"
        >
          <NavDropdown.Item
            className="profile-item"
            eventKey="4.1"
            href="/app/profile"
          >
            Pagina de profil
          </NavDropdown.Item>
          <NavDropdown.Item className="profile-item" eventKey="4.2">
            Activitatea mea*
          </NavDropdown.Item>
          <NavDropdown.Item className="profile-item" eventKey="4.3">
            Schimba parola
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            className="profile-item"
            eventKey="4.4"
            onClick={signOutUser}
            style={{ color: "red" }}
          >
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  )
}

export default HeaderApp
