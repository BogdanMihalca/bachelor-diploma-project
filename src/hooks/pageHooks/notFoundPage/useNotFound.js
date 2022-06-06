import { useStaticQuery, graphql } from "gatsby"

export const useNotFound = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(title: { eq: "404" }) {
        notfoundpageFields {
          title
          copy
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
  `)

  return data.wpPage.notfoundpageFields
}
