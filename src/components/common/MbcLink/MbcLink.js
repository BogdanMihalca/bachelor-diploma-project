import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const MbcLink = ({ link, children, className, prevLink }) => {
  const innerChild = () => {
    if (children) return children
    if (link.title) return link.title
    return "link"
  }
  if (!link || !link.url) return innerChild()

  if (
    link.url?.includes("http") ||
    link.url?.includes("mailto:") ||
    link.url?.includes("tel:")
  )
    return (
      <a
        href={link.url}
        target={`${link.target ? link.target : "_blank"}`}
        className={className}
      >
        {innerChild()}
      </a>
    )

  return (
    <Link
      to={link.url}
      target={`${link.target ? link.target : ""}`}
      className={className}
      state={{ prevPath: prevLink }}
    >
      {innerChild()}
    </Link>
  )
}

MbcLink.defaultProps = {
  children: null,
  className: "",
  prevLink: "",
}

MbcLink.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  prevLink: PropTypes.string,
}

export default MbcLink
