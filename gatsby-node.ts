import type { GatsbyNode } from "gatsby";
import path from "path";
import { createFilePath } from "gatsby-source-filesystem";

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value: `/blog${value}`,
        });
    }
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const blogPostTemplate = path.resolve(`./src/templates/blog-post.tsx`);
    const blogListTemplate = path.resolve(`./src/templates/blog-list.tsx`);

    const result = await graphql<{
        allMarkdownRemark: {
            nodes: Array<{
                id: string;
                fields: {
                    slug: string;
                };
            }>;
        };
    }>(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            result.errors
        );
        return;
    }

    const posts = result.data?.allMarkdownRemark.nodes || [];

    // Create blog post pages
    if (posts.length > 0) {
        posts.forEach((post, index) => {
            const previousPostId = index === 0 ? null : posts[index - 1].id;
            const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id;

            createPage({
                path: post.fields.slug,
                component: blogPostTemplate,
                context: {
                    id: post.id,
                    previousPostId,
                    nextPostId,
                },
            });
        });
    }

    // Create paginated blog list pages
    const postsPerPage = 6;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/blog` : `/blog/${i + 1}`,
            component: blogListTemplate,
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
            },
        });
    });
};
