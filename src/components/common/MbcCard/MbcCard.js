import React from "react"
import PropTypes from "prop-types"
import parse from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image"

import "./MbcCard.scss"

const MbcCard = ({ bg, title, icon, copy }) => {
  return (
    <div className={`mbc-card variant-${bg}`}>
      <GatsbyImage
        image={icon?.localFile?.childImageSharp?.gatsbyImageData}
        alt="mbc card"
        className="card-icon"
      />
      <h4>{title}</h4>
      <div className="card-copy">{parse(copy)}</div>
    </div>
  )
}

MbcCard.defaultProps = {
  title: "",
  icon: null,
  copy: "",
}

MbcCard.propTypes = {
  bg: PropTypes.oneOf(["blueDark", "blueLight", "orange", "red"]).isRequired,
  title: PropTypes.string,
  icon: PropTypes.object,
  copy: PropTypes.string,
}

export default MbcCard
