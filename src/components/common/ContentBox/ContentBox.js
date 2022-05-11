import React from "react"
import PropTypes from "prop-types"
import parse from "html-react-parser"
import { Container } from "react-bootstrap"

import "./ContentBox.scss"

const ContentBox = ({ content, withContainer, className }) => {
  if (!content) return null

  return withContainer ? (
    <Container>
      <div id="copy" className={`mbc-content ${className}`}>
        {parse(content)}
      </div>
    </Container>
  ) : (
    <div id="copy" className={`mbc-content ${className}`}>
      {parse(content)}
    </div>
  )
}

ContentBox.defaultProps = {
  withContainer: false,
  content: "",
  className: "",
}
ContentBox.propTypes = {
  withContainer: PropTypes.bool,
  content: PropTypes.string,
  className: PropTypes.string,
}

export default ContentBox
