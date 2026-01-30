import * as React from "react";
import { graphql, Link, HeadFC, PageProps } from "gatsby";
import { Layout } from "../components/Layout";
import { CategoryBadge } from "../components/CategoryBadge";
import { formatDate, calculateReadTime } from "../utils/date";

interface BlogPostTemplateProps extends PageProps {
    data: {
        markdownRemark: {
            html: string;
            excerpt: string;
            frontmatter: {
                title: string;
                date: string;
                description: string;
                category: string;
                author: string;
            };
        };
        previous: {
            fields: {
                slug: string;
            };
            frontmatter: {
                title: string;
            };
        } | null;
        next: {
            fields: {
                slug: string;
            };
            frontmatter: {
                title: string;
            };
        } | null;
    };
}

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({ data }) => {
    const post = data.markdownRemark;
    const { previous, next } = data;
    const readTime = calculateReadTime(post.html);

    return (
        <Layout>
            <article>
                <div className="container">
                    {/* Article Header */}
                    <header>
                        <div className="card-meta">
                            <CategoryBadge category={post.frontmatter.category} />
                            <span>{formatDate(post.frontmatter.date)}</span>
                            <span>{readTime} min read</span>
                        </div>

                        <h1>{post.frontmatter.title}</h1>

                        {post.frontmatter.description && (
                            <p className="description">{post.frontmatter.description}</p>
                        )}

                        <div className="author-info">
                            <p>
                                By <span className="author-name">{post.frontmatter.author}</span>
                            </p>
                        </div>
                    </header>

                    {/* Article Content */}
                    <div
                        className="markdown-content"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />

                    {/* Article Footer - Navigation */}
                    <footer className="article-nav">
                        <div className="back-link">
                            <Link to="/blog" className="btn btn-outline">
                                ← Back to All Posts
                            </Link>
                        </div>

                        <nav className="nav-grid">
                            {previous && (
                                <Link to={previous.fields.slug} className="nav-link">
                                    <span className="nav-label">← Previous</span>
                                    <span className="nav-title">{previous.frontmatter.title}</span>
                                </Link>
                            )}

                            {next && (
                                <Link to={next.fields.slug} className="nav-link">
                                    <span className="nav-label">Next →</span>
                                    <span className="nav-title">{next.frontmatter.title}</span>
                                </Link>
                            )}
                        </nav>
                    </footer>
                </div>
            </article>
        </Layout>
    );
};

export default BlogPostTemplate;

export const Head: HeadFC<BlogPostTemplateProps["data"]> = ({ data }) => {
    const post = data.markdownRemark;

    return (
        <>
            <title>{post.frontmatter.title} | ea.caret</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content={post.frontmatter.description || post.excerpt} />
            <meta property="og:title" content={post.frontmatter.title} />
            <meta property="og:description" content={post.frontmatter.description || post.excerpt} />
            <meta property="og:type" content="article" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.frontmatter.title} />
            <meta name="twitter:description" content={post.frontmatter.description || post.excerpt} />
        </>
    );
};

export const query = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date
        description
        category
        author
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
