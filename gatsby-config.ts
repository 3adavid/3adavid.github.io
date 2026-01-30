import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `ea.caret`,
    description: `A professional blog for trending tech announcements - AI trends, security vulnerabilities, library updates, and more.`,
    author: `David Adakole`,
    siteUrl: `https://3adavid.github.io`
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "ea.caret",
        short_name: "ea.caret",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#000000",
        display: "minimal-ui",
        icon: "src/images/icon.png"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "images",
        path: "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "blog",
        path: "./content/blog/"
      },
      __key: "blog"
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              quality: 90,
              linkImagesToOriginal: false,
              backgroundColor: 'transparent'
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              showLineNumbers: false,
              noInlineHighlight: false
            }
          },
          'gatsby-remark-autolink-headers'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }: any) => {
              return allMarkdownRemark.nodes.map((node: any) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { frontmatter: { date: DESC } }
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "ea.caret RSS Feed",
          },
        ],
      },
    }
  ]
};

export default config;
