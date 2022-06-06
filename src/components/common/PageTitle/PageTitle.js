import React from "react"
import PropTypes from "prop-types"

import "./PageTitle.scss"

const PageTitle = ({ title, noArrow }) => {
  return (
    <div className="mbc-page-title">
      {title && (
        <div className="wrapper">
          {!noArrow && <div className="arrow" />}
          <h1>{title} </h1>
        </div>
      )}
    </div>
  )
}

PageTitle.defaultProps = {
  title: "",
  noArrow: false,
}
PageTitle.propTypes = {
  title: PropTypes.string,
  noArrow: PropTypes.bool,
}

export default PageTitle
