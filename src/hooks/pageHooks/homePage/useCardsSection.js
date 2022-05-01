import { useStaticQuery, graphql } from "gatsby"

export const useCardsSection = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(isFrontPage: { eq: true }) {
        homepageFields {
          cardsSection {
            sectionHeading
            cards {
              copy
              title
              icon {
                localFile {
                  childImageSharp {
                    gatsbyImageData(formats: WEBP, width: 200)
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return data.wpPage.homepageFields.cardsSection
}
