import React, { useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"
import ModalVideo from "react-modal-video"

import { getYoutubeVideoId } from "../../../../utils/videoUtils"
import { useVideoSection } from "../../../../hooks/pageHooks/aboutUsPage/useVideoSection"
import ContentBox from "../../../common/ContentBox/ContentBox"
import MbcButton from "../../../common/MbcButton/MbcButton"
import "react-modal-video/scss/modal-video.scss"
import "./VideoSection.scss"

const VideoSection = () => {
  const [isOpen, setOpen] = useState(false)
  const { heading, copy, image, video } = useVideoSection()

  const [isModalAvailable, setIsModalAvailable] = useState(false)

  useEffect(() => {
    setIsModalAvailable(true)
  }, [])

  return (
    <Container>
      <Row className="mbc-video-section">
        <Col lg={6}>
          <GatsbyImage
            image={image?.localFile?.childImageSharp?.gatsbyImageData}
            alt="mbc studOra system"
          />
        </Col>
        <Col lg={6} className="d-flex flex-column justify-content-center">
          {heading && <h2>{heading}</h2>}
          <ContentBox content={copy} />
          <MbcButton variant="button-icon-play" onClick={() => setOpen(true)} />
          {isModalAvailable && (
            <ModalVideo
              channel="youtube"
              autoplay
              isOpen={isOpen}
              videoId={getYoutubeVideoId(video)}
              onClose={() => setOpen(false)}
            />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default VideoSection
