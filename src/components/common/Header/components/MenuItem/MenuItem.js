import React from "react"
import PropTypes from "prop-types"
import { Nav, NavDropdown } from "react-bootstrap"

import MbcLink from "../../../MbcLink/MbcLink"
import "./MenuItem.scss"

const MenuItem = ({ menuItem, location }) => {
  const hasSubMenu = menuItem.subItems.length !== 0

  return hasSubMenu ? (
    <NavDropdown title={menuItem.label} className="mbc-menu-item">
      {menuItem.subItems.map(subItem => (
        <NavDropdown.Item as="li" className="mbc-menu-item" key={subItem.id}>
          <MbcLink
            link={{
              url: subItem.url,
              target: subItem.target ? subItem.target : "",
            }}
            prevLink={location?.pathname}
          >
            {subItem.label}
          </MbcLink>
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  ) : (
    <Nav.Link as="li" className="mbc-menu-item">
      <MbcLink
        link={{
          url: hasSubMenu ? "#" : menuItem.url,
          target: menuItem.target ? menuItem.target : "",
        }}
        prevLink={location?.pathname}
      >
        {menuItem.label}
      </MbcLink>
    </Nav.Link>
  )
}

MenuItem.defaultProps = {
  location: {},
}

MenuItem.propTypes = {
  menuItem: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    label: PropTypes.string,
    target: PropTypes.string,
    subItems: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }),
}

export default MenuItem
