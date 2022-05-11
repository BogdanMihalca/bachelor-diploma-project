import { useStaticQuery, graphql } from "gatsby"

export const useFormSection = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(title: { eq: "Contact" }) {
        contactpageFields {
          contactForm {
            heading
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

  return data.wpPage.contactpageFields.contactForm
}
