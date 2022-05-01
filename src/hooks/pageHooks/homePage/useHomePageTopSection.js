import { useStaticQuery, graphql } from "gatsby"

export const useHomepageTopSection = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(isFrontPage: { eq: true }) {
        homepageFields {
          headerImage {
            localFile {
              childImageSharp {
                gatsbyImageData(formats: WEBP)
              }
            }
          }
          postsCarousel {
            post {
              ... on WpPost {
                id
                title
                excerpt
                uri
                tags {
                  nodes {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return data.wpPage.homepageFields
}
