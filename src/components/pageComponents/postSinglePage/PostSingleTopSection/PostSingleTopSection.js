import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"

import BackButton from "../../../common/BackButton/BackButton"
import FeaturedImageMask from "../../../../assets/images/png/article_featured_mask.png"
import "./PostSingleTopSection.scss"

const PostSingleTopSection = ({
  featuredImage,
  title,
  categories,
  tags,
  date,
  author,
}) => {
  const featuredImageObject =
    featuredImage?.localFile?.childImageSharp?.gatsbyImageData
  return (
    <Container className="post-single-top-section">
      <Row>
        <Col md={6} className="order-md-2 featured-image-container">
          {featuredImageObject && (
            <>
              <GatsbyImage
                image={featuredImageObject}
                className="featured-image"
                alt={featuredImage?.alt || "mbc studOra system"}
              />
              <img
                src={FeaturedImageMask}
                className="featured-mask"
                alt="featured mask"
              />
            </>
          )}
        </Col>
        <Col md={6} className="order-md-1">
          <BackButton>Inapoi</BackButton>
          <h1 className="post-title">{title}</h1>
          <div className="tags">
            {tags.map(tag => (
              <Link className="tag" to={tag.uri} key={tag.id}>
                {tag.name}
              </Link>
            ))}
          </div>
          <div className="categories">
            <span>Categorii: </span>
            {categories.map(category => (
              <Link className="category" to={category.uri} key={category.id}>
                {category.name}, &nbsp;
              </Link>
            ))}
          </div>
          <div className="post-author">
            <span>Autor: </span>
            {author}
          </div>
          <div className="post-date">
            <span>Data: </span>
            {date}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

PostSingleTopSection.defaultProps = {
  featuredImage: null,
  title: "",
  categories: [],
  tags: [],
  date: "",
  author: "",
}

PostSingleTopSection.propTypes = {
  featuredImage: PropTypes.object,
  title: PropTypes.string,
  categories: PropTypes.array,
  tags: PropTypes.array,
  date: PropTypes.string,
  author: PropTypes.string,
}

export default PostSingleTopSection
