export const getRedirectFromLocation = props => {
  const {
    location: { pathname },
  } = props

  return { from: pathname }
}

export const getRedirectFromState = props => {
  const {
    location: { state },
  } = props

  let from = "/app/login"

  if (state) {
    // if we are going directly to login there is no state
    from = state.from
  }

  return { from }
}
