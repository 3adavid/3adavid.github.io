import * as React from "react";

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="no-print">
            <div className="container">
                <div className="copyright">
                    © {currentYear} ea.caret by David Adakole. All rights reserved.
                </div>

                <div className="links">
                    <a href="https://github.com/3adavid" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href="/rss.xml">
                        RSS Feed
                    </a>
                </div>
            </div>
        </footer>
    );
};
