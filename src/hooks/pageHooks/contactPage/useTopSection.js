import { useStaticQuery, graphql } from "gatsby"

export const useTopSection = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(title: { eq: "Contact" }) {
        title
        contactpageFields {
          copy
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
