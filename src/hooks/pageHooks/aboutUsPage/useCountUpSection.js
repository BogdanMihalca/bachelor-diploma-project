import { useStaticQuery, graphql } from "gatsby"

export const useCountUpSection = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(title: { eq: "Despre Noi" }) {
        aboutusPageFileds {
          countupSection {
            heading
            items {
              value
              label
              color
            }
          }
        }
      }
    }
  `)

  return data.wpPage.aboutusPageFileds.countupSection
}
