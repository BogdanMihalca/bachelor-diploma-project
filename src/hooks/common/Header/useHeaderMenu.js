import { useStaticQuery, graphql } from "gatsby"

const flatListToHierarchical = (
  data = [],
  { idKey = "id", parentKey = "parentId", childrenKey = "subItems" } = {}
) => {
  const tree = []
  const childrenOf = {}
  data.forEach(item => {
    const newItem = { ...item }
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
    childrenOf[id] = childrenOf[id] || []
    newItem[childrenKey] = childrenOf[id]
    if (parentId)
      (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
    else tree.push(newItem)
  })
  return tree
}

export const useHeaderMenu = () => {
  const data = useStaticQuery(graphql`
    {
      wpMenu(locations: { eq: PRIMARY_MENU }) {
        id
        menuItems {
          nodes {
            id
            url
            title
            label
            target
            parentId
          }
        }
      }
    }
  `)

  return flatListToHierarchical(data.wpMenu.menuItems.nodes)
}
