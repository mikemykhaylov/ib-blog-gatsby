/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Gatsby.js Blog',
  },
  /* Your site config here */
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: 'IBBlog',
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: 'ibBlog',
        // Url to query from
        url: 'https://py89pcivba.execute-api.eu-central-1.amazonaws.com/dev/graphql',
      },
    },
  ],
};
