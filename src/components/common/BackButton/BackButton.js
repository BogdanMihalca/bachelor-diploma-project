/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

import "./BackButton.scss"

const BackButton = ({ children, backToUrl, noBorder }) => {
  return (
    <div
      className={`mbc-back-button ${noBorder ? "no-border" : ""} `}
      onClick={() => navigate(backToUrl || -1)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="51.264"
        height="39.353"
        viewBox="0 0 51.264 39.353"
      >
        <path
          id="Icon_awesome-arrow-left"
          d="M29.464,39.364l-2.54,2a3.278,3.278,0,0,1-3.879,0L.8,23.856A1.849,1.849,0,0,1,.8,20.8L23.045,3.283a3.278,3.278,0,0,1,3.879,0l2.54,2a1.862,1.862,0,0,1-.046,3.091L15.631,18.719H48.514a2.5,2.5,0,0,1,2.746,2.163v2.884a2.5,2.5,0,0,1-2.746,2.163H15.631L29.418,36.273A1.851,1.851,0,0,1,29.464,39.364Z"
          transform="translate(0.004 -2.647)"
          fill="#a30015"
        />
      </svg>
      <div className="children">
        <div className="wrapper">
          <h1>{children} </h1>
        </div>
      </div>
    </div>
  )
}

BackButton.defaultProps = {
  backToUrl: "",
  noBorder: false,
}

BackButton.propTypes = {
  children: PropTypes.node.isRequired,
  backToUrl: PropTypes.string,
  noBorder: PropTypes.bool,
}
export default BackButton
