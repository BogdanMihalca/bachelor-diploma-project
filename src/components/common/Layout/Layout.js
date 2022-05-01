import React from "react"
import propTypes from "prop-types"
import "./Layout.scss"
import "../../../sass/style.scss"

const Layout = ({ children, classes }) => {
  return <main className={classes ?? classes}>{children}</main>
}

Layout.defaultProps = {
  classes: null,
  children: null,
}

Layout.propTypes = {
  classes: propTypes.string,
  children: propTypes.node,
}

export default Layout
