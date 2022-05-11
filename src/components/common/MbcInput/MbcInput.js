import React from "react"
import PropTypes from "prop-types"
import { FormControl, FormGroup, FormLabel } from "react-bootstrap"

import "./MbcInput.scss"
import {
  VARIANT_CHECKBOX,
  VARIANT_EMAIL,
  VARIANT_NUMBER,
  VARIANT_PASSWORD,
  VARIANT_PHONE,
  VARIANT_RADIO,
  VARIANT_SELECT,
  VARIANT_TEXT,
  VARIANT_TEXTAREA,
} from "../../../constants"

const MbcInput = ({
  form: { touched, errors, handleBlur, handleChange },
  id,
  variant,
  options,
  field,
  label,
  name,
  placeholder,
  disabled,
  className,
  ...custom
}) => {
  const handleKeyDown = e => {
    e.target.style.height = "inherit"
    e.target.style.height = `${e.target.scrollHeight + 10}px`
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  }

  const getInputVariant = () => {
    //   TODO: the rest of the input components
    if (variant === VARIANT_TEXTAREA)
      return (
        <FormGroup>
          {label && <FormLabel>{label}</FormLabel>}
          <textarea
            {...field} // eslint-disable-line react/jsx-props-no-spreading
            aria-invalid={touched[field.name] && !!errors[field.name]}
            id={id}
            className={`${variant}-input`}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...custom}
            rows={5}
            value={field.value || ""}
            onKeyDown={handleKeyDown}
          />
          {touched[field.name] && errors[field.name] ? (
            <FormControl.Feedback type="invalid">
              {errors[field.name]}
            </FormControl.Feedback>
          ) : null}
        </FormGroup>
      )

    return (
      <FormGroup>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl
          {...field} // eslint-disable-line react/jsx-props-no-spreading
          aria-invalid={touched && !!errors[field.name]}
          type={variant}
          id={id}
          className={`${variant}-input`}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          value={field.value}
          {...custom} // eslint-disable-line react/jsx-props-no-spreading
        />
        {touched[field.name] && errors[field.name] ? (
          <FormControl.Feedback type="invalid">
            {errors[field.name]}
          </FormControl.Feedback>
        ) : null}
      </FormGroup>
    )
  }

  return <div className={`input-wrapper ${className}`}>{getInputVariant()}</div>
}

MbcInput.defaultProps = {
  options: [],
  placeholder: "",
  id: null,
  name: null,
  variant: "text",
  label: "",
  className: "",
  disabled: false,
}

MbcInput.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf([
    VARIANT_TEXT,
    VARIANT_EMAIL,
    VARIANT_PASSWORD,
    VARIANT_NUMBER,
    VARIANT_RADIO,
    VARIANT_TEXTAREA,
    VARIANT_SELECT,
    VARIANT_PHONE,
    VARIANT_CHECKBOX,
  ]),
  options: PropTypes.array,
  placeholder: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
    ]),
  }).isRequired,
  name: PropTypes.string,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    handleBlur: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

export default MbcInput
