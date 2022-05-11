import React from "react"
import PropTypes from "prop-types"
import { Col } from "react-bootstrap"

const EnumeratingItem = ({ index, color, title, copy }) => {
  return (
    <Col lg={6}>
      <div className="enumerating-item d-flex align-items-center">
        <div
          className="enumerating-circle"
          style={{
            backgroundColor: color,
          }}
        >
          <span>0{index + 1}</span>
        </div>
        <div className="d-inline-block">
          <h5>{title}</h5>
          <p>{copy}</p>
        </div>
      </div>
    </Col>
  )
}

EnumeratingItem.defaultProps = {
  index: 0,
  color: " #192756",
  title: "",
  copy: "",
}

EnumeratingItem.propTypes = {
  index: PropTypes.number,
  color: PropTypes.string,
  title: PropTypes.string,
  copy: PropTypes.string,
}

export default EnumeratingItem
