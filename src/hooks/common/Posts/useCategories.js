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

export const useCategories = () => {
  const data = useStaticQuery(graphql`
    {
      allWpCategory {
        nodes {
          uri
          name
          id
          parentId
        }
      }
    }
  `)

  return flatListToHierarchical(data.allWpCategory.nodes)
}
