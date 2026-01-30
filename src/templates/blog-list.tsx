import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { Layout } from "../components/Layout";
import { BlogPostCard } from "../components/BlogPostCard";
import { Pagination } from "../components/Pagination";

interface BlogListTemplateProps extends PageProps {
    data: {
        allMarkdownRemark: {
            nodes: Array<{
                id: string;
                excerpt: string;
                html: string;
                fields: {
                    slug: string;
                };
                frontmatter: {
                    title: string;
                    date: string;
                    description: string;
                    category: string;
                };
            }>;
        };
    };
    pageContext: {
        limit: number;
        skip: number;
        numPages: number;
        currentPage: number;
    };
}

const BlogListTemplate: React.FC<BlogListTemplateProps> = ({ data, pageContext }) => {
    const posts = data.allMarkdownRemark.nodes;
    const { currentPage, numPages } = pageContext;

    return (
        <Layout>
            <section className="py-16">
                <div className="container">
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold font-serif mb-4 text-[var(--color-text)]">
                            All Posts
                        </h1>
                        <p className="text-xl text-[var(--color-text-secondary)]">
                            Explore all tech trends, security updates, and announcements
                        </p>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-xl text-[var(--color-text-muted)]">
                                No posts found.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {posts.map((post) => (
                                    <BlogPostCard
                                        key={post.id}
                                        title={post.frontmatter.title}
                                        excerpt={post.frontmatter.description || post.excerpt}
                                        date={post.frontmatter.date}
                                        category={post.frontmatter.category}
                                        slug={post.fields.slug}
                                        html={post.html}
                                    />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                numPages={numPages}
                                basePath="/blog"
                            />
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default BlogListTemplate;

export const Head: HeadFC = ({ pageContext }: any) => {
    const { currentPage } = pageContext;
    const title = currentPage === 1 ? "Blog" : `Blog - Page ${currentPage}`;

    return (
        <>
            <title>{title} | ea.caret</title>
            <meta name="description" content="Browse all tech trends, AI updates, security vulnerabilities, and library announcements." />
            <meta property="og:title" content={`${title} | ea.caret`} />
            <meta property="og:description" content="Browse all tech trends, AI updates, security vulnerabilities, and library announcements." />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
        </>
    );
};

export const query = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        excerpt(pruneLength: 200)
        html
        fields {
          slug
        }
        frontmatter {
          title
          date
          description
          category
        }
      }
    }
  }
`;
