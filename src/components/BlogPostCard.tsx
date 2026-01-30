import * as React from "react";
import { Link } from "gatsby";
import { format } from "date-fns";
import { CategoryBadge } from "./CategoryBadge";
import { calculateReadTime } from "../utils/date";

interface BlogPostCardProps {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    slug: string;
    html?: string;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({
    title,
    excerpt,
    date,
    category,
    slug,
    html
}) => {
    const readTime = calculateReadTime(html);

    return (
        <article className="card">
            <div className="card-meta">
                <CategoryBadge category={category} />
                <time>{format(new Date(date), 'MMMM d, yyyy')}</time>
                <span>{readTime} min read</span>
            </div>

            <h2>
                <Link to={slug}>{title}</Link>
            </h2>

            <p className="line-clamp-3">{excerpt}</p>

            <Link to={slug} className="read-more">
                Read more
                <span>→</span>
            </Link>
        </article>
    );
};
