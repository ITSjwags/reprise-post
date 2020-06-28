module.exports = {
  siteMetadata: {
    title: `Reprise Post`,
    description: `Reprise Post video editing.`,
    author: `@reprisepost`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: `f6a69422411d8e5d0979d8aebbbdc9`,
        previewMode: true,
        disableLiveReload: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // TODO: set up analytics
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `reprise-post`,
        short_name: `reprise-post`,
        start_url: `/`,
        background_color: `#4E4A59`,
        theme_color: `#4E4A59`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
