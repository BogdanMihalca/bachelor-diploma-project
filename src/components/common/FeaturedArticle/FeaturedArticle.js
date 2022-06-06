import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import "./FeaturedArticle.scss"

const FeaturedArticle = ({ postData }) => {
  const featuredImage =
    postData.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData
  const tag = postData.tags?.nodes?.[0]?.name
  return (
    <article
      className="mbc-featured-article"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        {featuredImage && (
          <GatsbyImage
            image={featuredImage}
            alt={postData.title}
            className="featured-image"
          />
        )}
        {tag && <span className="tag">{tag}</span>}
      </header>
      <main>
        <h4>
          <Link to={postData.uri} itemProp="url">
            <span itemProp="headline">{postData.title}</span>
          </Link>
        </h4>
      </main>
      <footer>
        <div className="post-meta">{postData.date}</div>
        <Link to={postData.uri} className="read-post">
          Citeste &gt;&gt;
        </Link>
      </footer>
    </article>
  )
}

FeaturedArticle.propTypes = {
  postData: PropTypes.object.isRequired,
}

export default FeaturedArticle
