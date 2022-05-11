import React from "react"
import { ResizableBox } from "react-resizable"
import { useContactOptionsSection } from "../../../../hooks/pageHooks/contactPage/useContactOptionsSection"

import "./GoogleMapSection.scss"
import MyMapComponent from "./MyMapComponent"
import ResizableHandle from "./ResizableHandle"

const GoogleMapSection = () => {
  const {
    address: { latitude, longitude },
  } = useContactOptionsSection()

  return (
    <ResizableBox
      resizeHandles={["n"]}
      axis="y"
      className="mbc-contact-map-section"
      handleSize={[8, 8]}
      handle={<ResizableHandle />}
      height={500}
    >
      <MyMapComponent lat={Number(latitude)} lng={Number(longitude)} />
    </ResizableBox>
  )
}

export default GoogleMapSection
