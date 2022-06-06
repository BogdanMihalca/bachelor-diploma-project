import React from "react"
import PropTypes from "prop-types"

import ContentBox from "../../../common/ContentBox/ContentBox"
import "./PostContentSection.scss"

const PostContentSection = ({ content }) => {
  return (
    <ContentBox withContainer content={content} className="mbc-post-content" />
  )
}

PostContentSection.defaultProps = {
  content: "",
}

PostContentSection.propTypes = {
  content: PropTypes.string,
}

export default PostContentSection
