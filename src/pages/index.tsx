import * as React from "react";
import { Link, HeadFC, PageProps, graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { BlogPostCard } from "../components/BlogPostCard";

interface IndexPageProps extends PageProps {
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
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      {/* Hero Section - Compact */}
      <div className="hero">
        <div className="container">
          <h1>ea.caret</h1>
          <p>
            Your source for trending tech announcements. Stay updated on AI trends,
            security vulnerabilities, library updates, and emerging technologies.
          </p>
        </div>
      </div>

      {/* Recent Posts */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>Recent Posts</h2>
            <Link to="/blog" className="btn btn-outline">
              View All Posts
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center">
              <p>No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 grid-cols-2">
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
          )}
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>ea.caret - Tech Trends & Announcements</title>
    <meta name="description" content="Stay updated on the latest AI trends, security vulnerabilities, library updates, and emerging technologies." />
  </>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: 6
    ) {
      nodes {
        id
        excerpt
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
