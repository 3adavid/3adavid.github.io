import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import { Layout } from "../components/Layout";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <section>
        <div className="container text-center">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            Sorry, we couldn't find the page you're looking for.
            The content may have been moved or deleted.
          </p>
          <Link to="/" className="btn btn-primary">
            Return Home
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => (
  <>
    <title>404: Not Found | ea.caret</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
);
