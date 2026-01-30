import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Layout } from "../components/Layout";

const AboutPage: React.FC<PageProps> = () => {
    return (
        <Layout>
            <article className="py-16">
                <div className="container max-w-4xl">
                    <h1 className="text-5xl font-bold font-serif mb-8 text-[var(--color-text)]">
                        About ea.caret
                    </h1>

                    <div className="markdown-content">
                        <p className="text-xl leading-relaxed mb-8">
                            Welcome to <strong>ea.caret</strong> — your trusted source for staying ahead of the curve
                            in the ever-evolving world of technology.
                        </p>

                        <h2>Our Mission</h2>
                        <p>
                            In an industry that moves at breakneck speed, staying informed is crucial. ea.caret was
                            created to deliver timely, accurate, and insightful announcements about the latest trends
                            in technology, with a particular focus on:
                        </p>

                        <ul>
                            <li><strong>AI Trends</strong> — Breakthroughs, research, and emerging applications in artificial intelligence</li>
                            <li><strong>Security Vulnerabilities</strong> — Critical alerts and patches for libraries and frameworks</li>
                            <li><strong>Library Updates</strong> — New releases, deprecations, and important changes in popular development tools</li>
                            <li><strong>Tech Announcements</strong> — Industry news, product launches, and significant developments</li>
                        </ul>

                        <h2>Why ea.caret?</h2>
                        <p>
                            The name "ea.caret" reflects our commitment to precision and attention to detail — much like
                            the caret symbol (^) points to exactly where attention is needed. We cut through the noise
                            to bring you what matters most.
                        </p>

                        <h2>About the Author</h2>
                        <p>
                            <strong>David Adakole</strong> is a technology enthusiast and software developer passionate
                            about keeping the developer community informed and empowered. With years of experience in
                            software development and a keen eye for emerging trends, David curates and shares the most
                            relevant tech updates.
                        </p>

                        <h2>Stay Connected</h2>
                        <p>
                            Follow along for regular updates, subscribe to our <a href="/rss.xml">RSS feed</a>, or
                            connect on <a href="https://github.com/3adavid" target="_blank" rel="noopener noreferrer">GitHub</a>.
                        </p>

                        <p className="mt-8 text-[var(--color-text-muted)] italic">
                            Last updated: January 2026
                        </p>
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default AboutPage;

export const Head: HeadFC = () => (
    <>
        <title>About | ea.caret</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Learn about ea.caret, your trusted source for tech trends, AI updates, security vulnerabilities, and library announcements." />
        <meta property="og:title" content="About | ea.caret" />
        <meta property="og:description" content="Learn about ea.caret, your trusted source for tech trends, AI updates, security vulnerabilities, and library announcements." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
    </>
);
