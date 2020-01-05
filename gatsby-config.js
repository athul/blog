module.exports = {
  pathPrefix: `/blog`,
  siteMetadata: {
    title: `dayDreams ++`,
    author: `Athul Cyriac Ajay`,
    description: `Because I DayDream Incremetally`,
	  siteUrl: `https://blog.athulcyriac.co`,
    social: {
      twitter: `athulcajay`,
      github: `Athul-CA`,
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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
	{
	resolve:`gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: '÷',
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-143385382-1`,
      },
    },
    `gatsby-plugin-feed`,
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
    'gatsby-plugin-dark-mode',
  ],
}
