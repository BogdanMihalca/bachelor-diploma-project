/* eslint-disable react/prop-types */
import React from "react"
import { graphql, navigate } from "gatsby"
import { Col, Container, Row } from "react-bootstrap"

import Layout from "../components/common/Layout/Layout"
import Header from "../components/common/Header/Header"
import PostsPageListing from "../components/pageComponents/postsPage/PostsPageListing/PostPageListing"
import Footer from "../components/common/Footer/Footer"
import PostsPageTopSection from "../components/pageComponents/postsPage/PostsPageTopSection/PostsPageTopSection"
import PostsPageSidebar from "../components/pageComponents/postsPage/PostsPageSidebar/PostsPageSidebar"
import ListingPagination from "../components/common/ListingPagination/ListingPagination"

const PostArchiveTags = ({
  data,
  pageContext: { totalPages, currentPage, tagName, tagSlug },
}) => {
  const posts = data.allWpPost.nodes

  const handlePageChange = ({ selected }) => {
    const page = selected + 1
    if (page !== currentPage) {
      if (page === 1) navigate(`/tag/${tagSlug}/`)
      else navigate(`/tag/${tagSlug}/${page}`)
    }
  }

  return (
    <Layout isHomePage>
      <Header />
      <PostsPageTopSection title={`Eticheta: ${tagName}`} hasBackButton />
      <Container>
        <Row>
          <Col md={8}>
            <PostsPageListing data={posts} />
            {totalPages > 1 && (
              <ListingPagination
                pageCount={totalPages}
                currentPage={currentPage}
                handlePageClick={handlePageChange}
              />
            )}
          </Col>
          <Col md={4}>
            <PostsPageSidebar />
          </Col>
        </Row>
      </Container>
      <Footer />
    </Layout>
  )
}

export default PostArchiveTags

export const pageQuery = graphql`
  query WordPressPostArchiveTags(
    $offset: Int!
    $postsPerPage: Int!
    $id: String!
  ) {
    allWpPost(
      filter: { tags: { nodes: { elemMatch: { id: { eq: $id } } } } }
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        date(formatString: "MMMM DD, YYYY")
        title
        uri
        excerpt
        isSticky
        featuredImage {
          node {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            altText
          }
        }
        categories {
          nodes {
            uri
            name
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
  }
`
