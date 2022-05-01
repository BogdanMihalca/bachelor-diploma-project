import { useStaticQuery, graphql } from "gatsby"

export const useBottomSection = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(isFrontPage: { eq: true }) {
        homepageFields {
          bottomSection {
            title
            copy
            button {
              buttonLink
              buttonText
            }
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData(formats: WEBP)
                }
              }
            }
          }
        }
      }
    }
  `)

  return data.wpPage.homepageFields.bottomSection
}
