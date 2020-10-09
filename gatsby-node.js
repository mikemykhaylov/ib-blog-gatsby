const path = require("path");

exports.onCreateNode = ({ node }) => {
  console.log(`Node created of type "${node.internal.type}"`);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const results = await graphql(`
    query MyQuery {
      ibBlog {
        posts(pageSize: 5000) {
          posts {
            _id
            indexName
          }
        }
      }
    }
  `);
  if (results.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const { posts } = results.data.ibBlog.posts;
  const postsPerPage = 28;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: `/page/${i + 1}`,
      component: path.resolve("./src/templates/home.js"),
      context: {
        pageSize: postsPerPage,
        // skip: i * postsPerPage,
        // numPages,
        pageNumber: i + 1,
      },
    })
  })
};
