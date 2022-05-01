import { useStaticQuery, graphql } from "gatsby"

export const useFeaturesSection = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(isFrontPage: { eq: true }) {
        homepageFields {
          featuresSection {
            sectionHeading
            features {
              title
              description
              icon {
                localFile {
                  childImageSharp {
                    gatsbyImageData(formats: WEBP, width: 100)
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return data.wpPage.homepageFields.featuresSection
}
