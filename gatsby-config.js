module.exports = {
  pathPrefix: `/blog`,
  siteMetadata: {
    title: `dayDreams ++`,
    author: `Athul Cyriac Ajay`,
    description: `Because I DayDream Incrementally`,
    siteUrl: `https://blog.athulcyriac.co`,
    social: {
      twitter: `athulcajay`,
      github: `athul`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed-mdx`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `dayDreams ++`,
        short_name: `++`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#1abaa2`,
        display: `minimal-ui`,
        icon: `content/assets/n1.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-scroll-indicator`,
      options: {
        color: 'linear-gradient(to right, #50fa7b, #1565c0)',
      },
    },
    'gatsby-plugin-dark-mode',
    {
      resolve: `gatsby-remark-responsive-iframe`,
      options: {
        wrapperStyle: `margin-bottom: 1.0725rem`,
      },
    },
  ],
}
