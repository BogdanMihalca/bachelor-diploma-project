import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"

import "./MbcButton.scss"

const MbcButton = ({
  variant,
  bootstrapVariant,
  type,
  children,
  onClick,
  disabled,
  className,
}) => {
  const btnClasses = `mbc-button ${variant} ${className} ${
    children ? "-with-children" : "-single"
  } `

  return (
    <div className="btn-wrapper">
      <Button
        disabled={disabled}
        variant={bootstrapVariant}
        type={type === "submit" ? "submit" : "button"}
        onClick={onClick}
        className={btnClasses}
      >
        {children}
        {variant === "button-icon-play" && <div className="play-icon" />}
      </Button>
      {variant === "button-icon-play" && (
        <div className="d-inline">
          <span className="mbc-play-line" />
          <span className="mbc-play-text">Vizionati videoclipul</span>
        </div>
      )}
    </div>
  )
}

MbcButton.defaultProps = {
  type: "button",
  disabled: false,
  onClick: () => {},
  className: "",
  variant: "primary",
  bootstrapVariant: null,
}

MbcButton.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "button-text",
    "button-icon-play",
  ]),
  bootstrapVariant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "light",
    "link",
  ]),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

export default MbcButton
