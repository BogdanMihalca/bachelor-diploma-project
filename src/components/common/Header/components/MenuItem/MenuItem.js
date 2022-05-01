import React from "react"
import PropTypes from "prop-types"
import { Nav, NavDropdown } from "react-bootstrap"

import MbcLink from "../../../MbcLink/MbcLink"
import "./MenuItem.scss"

const MenuItem = ({ menuItem, location, className, component }) => {
  const hasSubMenu = menuItem.subItems.length !== 0

  return hasSubMenu ? (
    <NavDropdown
      title={menuItem.label}
      className={`mbc-menu-item ${className}`}
    >
      {menuItem.subItems.map(subItem => (
        <NavDropdown.Item
          as={component}
          className="mbc-menu-item"
          key={subItem.id}
        >
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
    <Nav.Link as={component} className={`mbc-menu-item ${className}`}>
      <MbcLink
        link={{
          url: menuItem.url,
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
  className: "",
  component: "li",
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
  className: PropTypes.string,
  component: PropTypes.any,
}

export default MenuItem
