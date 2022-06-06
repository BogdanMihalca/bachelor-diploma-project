import React from "react"
import PropTypes from "prop-types"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

const MyMapComponent = ({ lat, lng }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  })

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={15}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    )
  )
}

MyMapComponent.defaultProps = {
  lat: 0,
  lng: 0,
}

MyMapComponent.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
}

export default MyMapComponent
