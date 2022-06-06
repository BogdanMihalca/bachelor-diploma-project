import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Col, Row } from "react-bootstrap"

import ContentBox from "../../../../../common/ContentBox/ContentBox"
import "./PostsPageListingItem.scss"

const PostsPageListingItem = ({ postData }) => {
  const featuredImage =
    postData.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData
  return (
    <article
      className="mbc-post-list-item"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h2>
          <Link to={postData.uri} itemProp="url">
            <span itemProp="headline">{postData.title}</span>
          </Link>
        </h2>
      </header>
      <Row>
        <Col md={featuredImage ? 8 : 12}>
          <ContentBox content={postData.excerpt} className="post-excerpt" />
        </Col>
        {featuredImage && (
          <Col md={4} className="text-center featured-wrapper">
            <GatsbyImage
              image={featuredImage}
              alt={postData.title}
              className="featured-image"
            />
          </Col>
        )}
      </Row>
      <footer>
        <div className="post-meta">
          {postData.date} - {postData.author?.node?.firstName}{" "}
          {postData.author?.node?.lastName}
        </div>
        <Link to={postData.uri} className="read-post">
          Citeste &gt;&gt;
        </Link>
      </footer>
    </article>
  )
}

PostsPageListingItem.propTypes = {
  postData: PropTypes.object.isRequired,
}

export default PostsPageListingItem
