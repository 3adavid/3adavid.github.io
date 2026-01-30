import * as React from "react";
import { Link } from "gatsby";
import { Search } from "./Search";
import { ThemeToggle } from "./ThemeToggle";

export const Header: React.FC = () => {
    return (
        <header className="no-print">
            <div className="container">
                <Link to="/" className="logo">
                    ea.caret
                </Link>

                <div className="header-content">
                    <Search />

                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/about">About</Link>
                    </nav>

                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};
