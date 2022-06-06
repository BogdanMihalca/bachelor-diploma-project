/* eslint-disable consistent-return */
const path = require(`path`)
const chunk = require(`lodash/chunk`)

/**
 * This function creates all the individual Posts in this site
 */
const createIndividualPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: post.uri,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/post-single.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

/**
 * This function creates all the individual Post pages in this site
 */
async function createPostArchive({ posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings
  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1
      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? `/posts` : `/posts/${page}`
        }
        return null
      }
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),
        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/post-archive.js`),
        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,
          // We need to tell the template how many posts to display too
          postsPerPage,
          currentPage: pageNumber,
          totalPages,
        },
      })
    })
  )
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `)
  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }
  return graphqlResult.data.allWpPost.edges
}

const getCategories = async ({ graphql, reporter }) => {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpCategories {
      allWpCategory {
        nodes {
          name
          uri
          slug
          count
          id
          parentId
        }
      }
    }
  `)
  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }
  return graphqlResult.data.allWpCategory.nodes
}

const getTags = async ({ graphql, reporter }) => {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpTags {
      allWpTag {
        nodes {
          name
          uri
          slug
          count
          id
        }
      }
    }
  `)
  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }
  return graphqlResult.data.allWpTag.nodes
}

/**
 * This function creates all the individual category pages in this site
 */
async function createCategoryPages({ categories, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  return Promise.all(
    categories.map(async category => {
      const totalPages = Math.ceil(category.count / postsPerPage) || 1
      Array.from({ length: totalPages }).map(async (_, i) => {
        const pageNumber = i + 1
        const getPagePath = page => {
          if (page > 0 && page <= totalPages) {
            return page === 1 ? `${category.uri}` : `${category.uri}${page}/`
          }
        }

        await gatsbyUtilities.actions.createPage({
          path: getPagePath(pageNumber),

          // use the blog post archive template as the page component
          component: path.resolve(`./src/templates/post-archive-categories.js`),

          // `context` is available in the template as a prop and
          // as a variable in GraphQL.
          context: {
            id: category.id,
            offset: i * postsPerPage,
            postsPerPage,
            pagePath: category.uri,
            totalPages,
            categoryName: category.name,
            categorySlug: category.slug,
            currentPage: pageNumber,
            seo: category.seo,
            parentCategory: categories.find(cat => cat.id === category.parentId)
              ?.name,
            nextPagePath: getPagePath(pageNumber + 1),
            previousPagePath: getPagePath(pageNumber - 1),
          },
        })
      })
    })
  )
}

/**
 * This function creates all the individual tags pages in this site
 */
async function createTagsPages({ tags, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  return Promise.all(
    tags.map(async tag => {
      const totalPages = Math.ceil(tag.count / postsPerPage) || 1
      Array.from({ length: totalPages }).map(async (_, i) => {
        const pageNumber = i + 1
        const getPagePath = page => {
          if (page > 0 && page <= totalPages) {
            return page === 1 ? `${tag.uri}` : `${tag.uri}${page}/`
          }
        }

        await gatsbyUtilities.actions.createPage({
          path: getPagePath(pageNumber),

          // use the blog post archive template as the page component
          component: path.resolve(`./src/templates/post-archive-tags.js`),

          // `context` is available in the template as a prop and
          // as a variable in GraphQL.
          context: {
            id: tag.id,
            offset: i * postsPerPage,
            postsPerPage,
            pagePath: tag.uri,
            totalPages,
            tagName: tag.name,
            tagSlug: tag.slug,
            currentPage: pageNumber,
            nextPagePath: getPagePath(pageNumber + 1),
            previousPagePath: getPagePath(pageNumber - 1),
          },
        })
      })
    })
  )
}

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query all the data for which we need to generate the pages from the GraphQL server
  const posts = await getPosts(gatsbyUtilities)
  const categories = await getCategories(gatsbyUtilities)
  const tags = await getTags(gatsbyUtilities)

  if (posts.length) {
    // If there are posts, create pages for them
    await createIndividualPostPages({ posts, gatsbyUtilities })
    // And a paginated archive
    await createPostArchive({ posts, gatsbyUtilities })
  }

  if (categories.length)
    await createCategoryPages({ categories, gatsbyUtilities })

  if (tags.length) await createTagsPages({ tags, gatsbyUtilities })
}

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Only update the `/app` page.
  if (page.path.match(/^\/app/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    // eslint-disable-next-line no-param-reassign
    page.matchPath = "/app/*"
    // Update the page.
    createPage(page)
  }
}
