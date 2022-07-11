/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Redirect } from "@gatsbyjs/reach-router"
import PropTypes from "prop-types"
import { Spinner } from "react-bootstrap"

import useFirebaseContext from "../../context/useFirebaseContext"
import { getRedirectFromLocation } from "../../utils/navigationUtils"

const AuthGuard = props => {
  const {
    component: Component,
    location: { pathname },
    ...rest
  } = props
  const { user, isLoading } = useFirebaseContext()

  const state = getRedirectFromLocation(props)

  if (!user && !isLoading && pathname !== "/app/login") {
    return <Redirect noThrow to="/app/login" state={state} />
  }

  if (isLoading) return <Spinner />
  return <Component {...rest} />
}

AuthGuard.propTypes = {
  component: PropTypes.elementType.isRequired,
}

export default AuthGuard
