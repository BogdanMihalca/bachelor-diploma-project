import React from "react"
import Slider from "react-slick"
import parse from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image"
import { Col, Container, Row } from "react-bootstrap"

import { useTopSection } from "../../../../hooks/pageHooks/homePage/useTopSection"
import MbcButton from "../../../common/MbcButton/MbcButton"
import MbcLink from "../../../common/MbcLink/MbcLink"

// Import css files
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./TopSection.scss"

const TopSection = () => {
  const { headerImage, postsCarousel } = useTopSection()

  const sliderSettings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 2000,
    autoPlay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // eslint-disable-next-line object-shorthand,func-names,react/no-unstable-nested-components
    customPaging: function (i) {
      return (
        <div key={i} className="dot">
          <span className="slide-index">{i + 1}</span>
          <span className="slide-active-title">
            {postsCarousel[i].post.tags?.nodes?.length
              ? postsCarousel[i].post.tags.nodes[0].name
              : "Articol nou"}
          </span>
        </div>
      )
    },
  }

  return (
    <div className="homepage-top-section">
      <GatsbyImage
        image={headerImage?.localFile?.childImageSharp?.gatsbyImageData}
        className="top-image"
        alt="mbc studOra system"
      />
      <Container>
        <Row>
          <Col className="col col-lg-6">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Slider {...sliderSettings} className="top-slider">
              {postsCarousel.map(({ post }) => (
                <div className="featured-post-slide" key={post.id}>
                  <h2>{post.title}</h2>
                  <div className="featured-post-excerpt">
                    {parse(post.excerpt)}
                  </div>
                  <MbcButton
                    variant="primary"
                    className="featured-post-read-more"
                  >
                    <MbcLink link={{ url: post.uri }}>Citeste</MbcLink>
                  </MbcButton>
                </div>
              ))}
            </Slider>
          </Col>
          <Col className="col col-lg-6 " />
        </Row>
      </Container>
    </div>
  )
}

export default TopSection
