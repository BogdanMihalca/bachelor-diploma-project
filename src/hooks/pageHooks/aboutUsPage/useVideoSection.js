import { useStaticQuery, graphql } from "gatsby"

export const useVideoSection = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(title: { eq: "Despre Noi" }) {
        aboutusPageFileds {
          videoSection {
            heading
            copy
            video
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

  return data.wpPage.aboutusPageFileds.videoSection
}
