import { useStaticQuery, graphql } from "gatsby"

export const useTopSection = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(title: { eq: "Despre Noi" }) {
        title
        aboutusPageFileds {
          headerImage {
            localFile {
              childImageSharp {
                gatsbyImageData(formats: WEBP)
              }
            }
          }
        }
      }
    }
  `)

  return data.wpPage
}
