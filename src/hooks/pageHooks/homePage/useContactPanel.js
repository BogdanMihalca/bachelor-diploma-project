import { useStaticQuery, graphql } from "gatsby"

export const useContactPanel = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(isFrontPage: { eq: true }) {
        homepageFields {
          contactPanel {
            copy
            panelHeading
          }
        }
      }
    }
  `)

  return data.wpPage.homepageFields.contactPanel
}
