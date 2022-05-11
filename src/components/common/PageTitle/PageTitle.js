import React from "react"
import PropTypes from "prop-types"

import "./PageTitle.scss"

const PageTitle = ({ title }) => {
  return (
    <div className="mbc-page-title">
      {title && (
        <div className="wrapper">
          <div className="arrow" />
          <h1>{title} </h1>
        </div>
      )}
    </div>
  )
}

PageTitle.defaultProps = {
  title: "",
}
PageTitle.propTypes = {
  title: PropTypes.string,
}

export default PageTitle
