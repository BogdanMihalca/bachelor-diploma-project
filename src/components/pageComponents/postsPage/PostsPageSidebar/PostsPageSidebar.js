import React from "react"
import { useFeaturedArticles } from "../../../../hooks/common/Posts/useFeaturedArticles"

import { useTags } from "../../../../hooks/common/Posts/useTags"
import FeaturedArticle from "../../../common/FeaturedArticle/FeaturedArticle"
import Tag from "../../../common/Tag/Tag"
import "./PostsPageSidebar.scss"

const PostsPageSidebar = () => {
  const tags = useTags()
  const featuredArticles = useFeaturedArticles()

  return (
    <div className="posts-page-sidebar">
      <div className="sidebar-content">
        <div className="sidebar-top">
          <h2>Etichete recente</h2>
          <div className="tags">
            {tags.map(tag => (
              <Tag key={tag.id} title={tag.name} url={tag.uri} />
            ))}
          </div>
        </div>

        <div className="featured-articles">
          <h2>Cele mai accesate</h2>
          <div className="articles">
            {featuredArticles.map(article => (
              <FeaturedArticle key={article.id} postData={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostsPageSidebar
