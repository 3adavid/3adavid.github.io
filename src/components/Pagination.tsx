import * as React from "react";
import { Link } from "gatsby";

interface PaginationProps {
    currentPage: number;
    numPages: number;
    basePath?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    numPages,
    basePath = "/blog"
}) => {
    if (numPages <= 1) return null;

    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? basePath : `${basePath}/${currentPage - 1}`;
    const nextPage = `${basePath}/${currentPage + 1}`;

    return (
        <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
            {!isFirst && (
                <Link
                    to={prevPage}
                    className="btn btn-outline"
                    rel="prev"
                >
                    ← Previous
                </Link>
            )}

            <div className="flex items-center gap-2 mx-4">
                {Array.from({ length: numPages }, (_, i) => (
                    <Link
                        key={`page-${i + 1}`}
                        to={i === 0 ? basePath : `${basePath}/${i + 1}`}
                        className={`px-4 py-2 font-semibold transition-colors ${currentPage === i + 1
                                ? 'bg-[var(--color-accent)] text-white'
                                : 'text-[var(--color-accent)] hover:bg-[var(--color-bg-secondary)]'
                            }`}
                    >
                        {i + 1}
                    </Link>
                ))}
            </div>

            {!isLast && (
                <Link
                    to={nextPage}
                    className="btn btn-outline"
                    rel="next"
                >
                    Next →
                </Link>
            )}
        </nav>
    );
};
