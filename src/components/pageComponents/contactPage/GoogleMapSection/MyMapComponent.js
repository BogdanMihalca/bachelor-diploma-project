import React from "react"
import PropTypes from "prop-types"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const MyMapComponent = ({ lat, lng }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  }

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={15}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </LoadScript>
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
