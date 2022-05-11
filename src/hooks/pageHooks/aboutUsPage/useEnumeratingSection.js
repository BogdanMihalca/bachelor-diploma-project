import { useStaticQuery, graphql } from "gatsby"

export const useEnumeratingSection = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(title: { eq: "Despre Noi" }) {
        aboutusPageFileds {
          enumeratingSection {
            heading
            copy
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData(formats: WEBP)
                }
              }
            }
            items {
              title
              copy
              color
            }
          }
        }
      }
    }
  `)

  return data.wpPage.aboutusPageFileds.enumeratingSection
}
