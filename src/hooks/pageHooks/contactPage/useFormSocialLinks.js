import { useStaticQuery, graphql } from "gatsby"

export const useFormSocialLinks = () => {
  const data = useStaticQuery(graphql`
    {
      wp {
        acfOptionsOptions {
          optionsFields {
            generalSettings {
              contactData {
                facebook
                twitter
                instagram
                linkedin
              }
            }
          }
        }
      }
    }
  `)

  return data.wp.acfOptionsOptions.optionsFields.generalSettings.contactData
}
