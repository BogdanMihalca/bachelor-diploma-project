import { useStaticQuery, graphql } from "gatsby"

export const useHeaderLogo = () => {
  const data = useStaticQuery(graphql`
    {
      wp {
        acfOptionsOptions {
          optionsFields {
            generalSettings {
              logo {
                logoOnDark {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(
                        formats: WEBP
                        placeholder: NONE
                        width: 200
                      )
                    }
                  }
                }
                logoOnWhite {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(
                        formats: WEBP
                        placeholder: NONE
                        width: 200
                      )
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return data.wp.acfOptionsOptions.optionsFields.generalSettings.logo
}
