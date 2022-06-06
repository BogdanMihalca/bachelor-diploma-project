import React from "react"
import PropTypes from "prop-types"

import MbcLink from "../MbcLink/MbcLink"
import "./Tag.scss"

const Tag = ({ title, url }) => {
  return (
    <div className="mbc-tag">
      <MbcLink link={{ url }}>{title}</MbcLink>
    </div>
  )
}

Tag.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default Tag
