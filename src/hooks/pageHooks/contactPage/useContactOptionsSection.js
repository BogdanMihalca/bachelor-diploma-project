import { useStaticQuery, graphql } from "gatsby"

export const useContactOptionsSection = () => {
  const data = useStaticQuery(graphql`
    {
      wp {
        acfOptionsOptions {
          optionsFields {
            generalSettings {
              contactData {
                phone
                email
                address {
                  label
                  latitude
                  longitude
                }
              }
            }
          }
        }
      }
    }
  `)

  return data.wp.acfOptionsOptions.optionsFields.generalSettings.contactData
}
