import * as React from "react";
import type { GatsbySSR } from "gatsby";

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
    setHeadComponents([
        <script
            key="theme-script"
            dangerouslySetInnerHTML={{
                __html: `
          (function() {
            function getTheme() {
              try {
                var savedTheme = localStorage.getItem('theme');
                if (savedTheme) return savedTheme;
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              } catch (e) {
                return 'light';
              }
            }
            var theme = getTheme();
            document.documentElement.setAttribute('data-theme', theme);
          })();
        `,
            }}
        />,
    ]);
};
