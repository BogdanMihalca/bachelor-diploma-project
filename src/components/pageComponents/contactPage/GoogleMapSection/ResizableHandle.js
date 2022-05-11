/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react"

const ResizableHandle = React.forwardRef((props, ref) => {
  const { handleAxis, ...restProps } = props
  return (
    <div className="resizable-handle" ref={ref} {...restProps}>
      <span />
      <span />
      <span />
      <span />
    </div>
  )
})

export default ResizableHandle
