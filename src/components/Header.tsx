import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { Search } from "./Search";
import { ThemeToggle } from "./ThemeToggle";

export const Header: React.FC = () => {
    return (
        <header className="no-print">
            <div className="container">
                <Link to="/" className="logo flex items-center gap-2">
                    <StaticImage
                        src="../images/icon.png"
                        alt="ea.caret Logo"
                        height={32}
                        width={32}
                        placeholder="blurred"
                        className="rounded-full"
                    />
                    <span>ea.caret</span>
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
