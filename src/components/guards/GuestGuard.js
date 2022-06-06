/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { navigate } from "gatsby"
import PropTypes from "prop-types"

import useFirebaseContext from "../../context/useFirebaseContext"
import { getRedirectFromState } from "../../utils/navigationUtils"

const GuestGuard = props => {
  const { component: Component, ...rest } = props
  const { user, isLoading } = useFirebaseContext()

  if (user && !isLoading) {
    const redirectData = getRedirectFromState(props)
    navigate(redirectData.from !== "/" ? redirectData.from : "/app")
    return null
  }

  return <Component {...rest} />
}

GuestGuard.propTypes = {
  component: PropTypes.elementType.isRequired,
}

export default GuestGuard
