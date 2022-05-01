import { useStaticQuery, graphql } from "gatsby"

export const useFooter = () => {
  const data = useStaticQuery(graphql`
    {
      wp {
        acfOptionsOptions {
          optionsFields {
            generalSettings {
              footer {
                footerCopyrightText
              }
            }
          }
        }
      }
    }
  `)

  return data.wp.acfOptionsOptions.optionsFields.generalSettings.footer
}
