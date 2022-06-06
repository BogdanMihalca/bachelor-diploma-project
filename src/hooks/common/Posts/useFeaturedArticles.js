import { useStaticQuery, graphql } from "gatsby"

export const useFeaturedArticles = () => {
  const data = useStaticQuery(graphql`
    {
      allWpPost(filter: { isSticky: { eq: true } }) {
        nodes {
          id
          date(formatString: "DD/MM/YYYY")
          title
          uri
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
          tags {
            nodes {
              name
            }
          }
        }
      }
    }
  `)

  return data.allWpPost.nodes
}
