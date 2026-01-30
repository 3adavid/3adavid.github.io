import * as React from "react";
import { HeadFC } from "gatsby";

interface SEOProps {
    title: string;
    description?: string;
    pathname?: string;
    children?: React.ReactNode;
}

export const SEO: React.FC<SEOProps> = ({ title, description, pathname, children }) => {
    return (
        <>
            <title>{title} | ea.caret</title>
            <meta name="description" content={description || "A professional blog for trending tech announcements"} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description || "A professional blog for trending tech announcements"} />
            <meta property="og:type" content="website" />
            {pathname && <meta property="og:url" content={`https://3adavid.github.io${pathname}`} />}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description || "A professional blog for trending tech announcements"} />
            {children}
        </>
    );
};

export const Head: HeadFC<any> = ({ data, pageContext }) => {
    return <SEO title="ea.caret" />;
};
