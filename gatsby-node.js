/* eslint-disable no-await-in-loop */
const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const { data: fetchedPostsData, errors: errorPostsData } = await graphql(`
    {
      ibBlog {
        posts(pageSize: 5000) {
          posts {
            _id
            indexName
            image
          }
        }
      }
    }
  `);
  if (errorPostsData) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const { posts: postIds } = fetchedPostsData.ibBlog.posts;
  const postsPerPage = 28;
  const numPages = Math.ceil(postIds.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: `/page/${i + 1}`,
      component: path.resolve('./src/templates/home.js'),
      context: {
        pageSize: postsPerPage,
        pageNumber: i + 1,
      },
    });
  });
  // Creating index page
  // createPage({
  //   path: `/`,
  //   component: path.resolve('./src/templates/home.js'),
  //   context: {
  //     pageSize: postsPerPage,
  //     pageNumber: 1,
  //   },
  // });

  postIds.forEach((postId) => {
    createPage({
      path: `/post/${postId.indexName}`,
      component: path.resolve('./src/templates/post.js'),
      context: {
        indexName: postId.indexName,
        image: `/${postId.image.match(/programming\d+/)[0]}/`,
      },
    });
  });
};
