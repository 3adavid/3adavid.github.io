import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, navigate, useStaticQuery, graphql } from "gatsby";

interface SearchResult {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    category: string;
}

export const Search: React.FC = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const data = useStaticQuery(graphql`
    query SearchQuery {
      allMarkdownRemark {
        nodes {
          id
          excerpt(pruneLength: 150)
          fields {
            slug
          }
          frontmatter {
            title
            category
          }
        }
      }
    }
  `);

    const allPosts: SearchResult[] = data.allMarkdownRemark.nodes.map((node: any) => ({
        id: node.id,
        title: node.frontmatter.title,
        excerpt: node.excerpt,
        slug: node.fields.slug,
        category: node.frontmatter.category,
    }));

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+K or Cmd+K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                inputRef.current?.focus();
            }
            // Escape to close
            if (e.key === "Escape") {
                setIsOpen(false);
                setQuery("");
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const searchQuery = query.toLowerCase();
        const filtered = allPosts.filter(
            (post) =>
                post.title.toLowerCase().includes(searchQuery) ||
                post.excerpt.toLowerCase().includes(searchQuery) ||
                post.category.toLowerCase().includes(searchQuery)
        );

        setResults(filtered);
        setIsOpen(true);
    }, [query, allPosts]);

    const handleResultClick = (slug: string) => {
        setQuery("");
        setIsOpen(false);
        navigate(slug);
    };

    return (
        <div className="search-container" ref={searchRef}>
            <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Search posts... (Ctrl+K)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.length >= 2 && setIsOpen(true)}
            />

            {isOpen && (
                <div className="search-results">
                    {results.length > 0 ? (
                        results.map((result) => (
                            <div
                                key={result.id}
                                className="search-result-item"
                                onClick={() => handleResultClick(result.slug)}
                            >
                                <div className="search-result-title">{result.title}</div>
                                <div className="search-result-excerpt">{result.excerpt}</div>
                            </div>
                        ))
                    ) : (
                        <div className="search-no-results">
                            No posts found for "{query}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
