import React from "react"
import { Container } from "react-bootstrap"

import { useFeaturedArticles } from "../../../../hooks/common/Posts/useFeaturedArticles"
import FeaturedArticle from "../../../common/FeaturedArticle/FeaturedArticle"
import "./FeaturedArticlesSection.scss"

const FeaturedArticlesSection = () => {
  const featuredArticles = useFeaturedArticles()

  return (
    <Container className="single-post-featured-articles">
      <h2>Alte articole populare in randul cititorilor</h2>
      <div className="articles">
        {featuredArticles.map(article => (
          <FeaturedArticle key={article.id} postData={article} />
        ))}
      </div>
    </Container>
  )
}

export default FeaturedArticlesSection
