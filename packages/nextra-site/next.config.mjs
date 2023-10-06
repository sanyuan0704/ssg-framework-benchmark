import nextra from "nextra";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./src/theme.config.js",
  staticImage: true,
  latex: true,
  flexsearch: {
    codeblock: false,
  },
});

export default withNextra({
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["@zh"] = path.join(dirname, "src/pages", "zh");
    config.resolve.alias["@en"] = path.join(dirname, "src/pages", "en");
    return config;
  },
});
