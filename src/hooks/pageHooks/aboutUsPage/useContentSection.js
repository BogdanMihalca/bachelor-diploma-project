import { useStaticQuery, graphql } from "gatsby"

export const useContentSection = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(title: { eq: "Despre Noi" }) {
        aboutusPageFileds {
          contentSection
        }
      }
    }
  `)

  return data.wpPage.aboutusPageFileds
}
