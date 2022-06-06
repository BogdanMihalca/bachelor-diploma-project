import { useStaticQuery, graphql } from "gatsby"

export const useTags = () => {
  const data = useStaticQuery(graphql`
    {
      allWpTag(sort: { fields: count, order: ASC }) {
        nodes {
          uri
          name
          id
          count
        }
      }
    }
  `)

  return data.allWpTag.nodes
}
