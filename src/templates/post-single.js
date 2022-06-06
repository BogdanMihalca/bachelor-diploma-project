/* eslint-disable react/prop-types */
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/common/Layout/Layout"
import Header from "../components/common/Header/Header"
import PostSingleTopSection from "../components/pageComponents/postSinglePage/PostSingleTopSection/PostSingleTopSection"
import PostContentSection from "../components/pageComponents/postSinglePage/PostContentSection/PostContentSection"
import Footer from "../components/common/Footer/Footer"
import FeaturedArticlesSection from "../components/pageComponents/postSinglePage/FeaturedArticlesSection/FeaturedArticlesSection"

const BlogPostTemplate = ({ data: { post } }) => {
  return (
    <Layout classes="background-home ">
      <Header />
      <PostSingleTopSection
        featuredImage={post.featuredImage?.node}
        title={post.title}
        categories={post.categories.nodes}
        tags={post.tags.nodes}
        author={`${post.author.node.firstName} ${post.author.node.lastName}`}
        date={post.date}
      />
      <PostContentSection content={post.content} />
      <FeaturedArticlesSection />
      <Footer />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById($id: String!) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      isSticky
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
      categories {
        nodes {
          id
          uri
          name
        }
      }
      tags {
        nodes {
          id
          name
          uri
        }
      }
      author {
        node {
          uri
          name
          firstName
          lastName
        }
      }
    }
  }
`
