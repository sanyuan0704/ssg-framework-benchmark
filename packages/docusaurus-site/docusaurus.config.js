const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const path = require("path");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Client Website Documentation",
  tagline: "Documentation for your brand new website from WebDevStudios",
  url: "https://webdevstudios.github.io",
  baseUrl: "/",
  organizationName: "webdevstudios",
  projectName: "docusaurus-starter",
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  themeConfig: {
    navbar: {
      logo: {
        alt: "WebDevStudios Logo",
        src: "img/wds-logo-60x60.webp",
      },
      items: [
        {
          href: "https://github.com/WebDevStudios/docusaurus-starter",
          label: "Project GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} - WD3, LLC`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  onBrokenLinks: "ignore",
  plugins: [
    function ModernPlugin() {
      return {
        name: "modern-plugin",
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              alias: {
                "@zh": path.join(__dirname, "docs", "zh"),
                "@en": path.join(__dirname, "docs", "en"),
              },
              extensions: [".js", ".jsx", ".ts", ".tsx", ".md", ".mdx"],
            },
            cache: false,
          };
        },
      };
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          editUrl:
            "https://github.com/WebDevStudios/docusaurus-starter/blob/main/",
        },
      },
    ],
  ],
};
