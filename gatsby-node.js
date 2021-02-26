/* eslint-disable no-await-in-loop */
const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const { data: fetchedPostsData, errors: errorPostsData } = await graphql(`
    query getPosts {
      ibBlog {
        getPosts {
          id
          indexName
          image
        }
      }
    }
  `);
  if (errorPostsData) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const postIds = fetchedPostsData.ibBlog.getPosts;
  const postsPerPage = 28;
  const numPages = Math.ceil(postIds.length / postsPerPage);
  for (let i = 0; i < numPages; i += 1) {
    createPage({
      path: `/page/${i + 1}`,
      component: path.resolve('./src/templates/home.js'),
      context: {
        pageNumber: i + 1,
      },
    });
  }

  postIds.forEach((post) => {
    createPage({
      path: `/post/${post.indexName}`,
      component: path.resolve('./src/templates/post.js'),
      context: {
        image: `/${post.image.match(/programming\d+/)[0]}/`,
        postID: post.id
      },
    });
  });
};
