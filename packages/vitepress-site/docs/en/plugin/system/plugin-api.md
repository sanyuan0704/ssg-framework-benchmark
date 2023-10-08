# Plugin API

In the previous section, we introduced the basic structure of the plugin. In this section, we will introduce the API of the plugin to help you understand the abilities of the plugin in more detail.

tip TIP
In order to get better type hints, you can install `@rspress/shared` in the project, and then import the `RspressPlugin` type through `import { RspressPlugin } from '@rspress/shared'`.

### globalStyles

- **Type**：`string`

It is used to add a global style, and the absolute path of a style file is passed in, and the usage is as follows:

```tsx
import { RspressPlugin } from "@rspress/shared";
import path from "path";

export function pluginForDoc(): RspressPlugin {
  // style path
  const stylePath = path.join(__dirname, "some-style.css");
  return {
    // plugin name
    name: "plugin-name",
    globalStyles: path.join(__dirname, "global.css"),
  };
}
```

For example, if you want to modify the theme color, you can do so by adding a global style:

```css
:root {
  --rp-c-brand: #ffa500;
  --rp-c-brand-dark: #ffa500;
  --rp-c-brand-darker: #c26c1d;
  --rp-c-brand-light: #f2a65a;
  --rp-c-brand-lighter: #f2a65a;
}
```

### globalUIComponents

- **Type**：`(string | [string, object])[]`

It is used to add global components, passing in an array, each item in the array is the absolute path of a component, the usage is as follows:

```tsx
import { RspressPlugin } from "@rspress/shared";

export function pluginForDoc(): RspressPlugin {
  // component path
  const componentPath = path.join(__dirname, "xxx.tsx");
  return {
    // plugin name
    name: "plugin-comp",
    // Path to global components
    globalUIComponents: [componentPath],
  };
}
```

The item of `globalUIComponents` can be a string, which is the path of the component file, or an array, the first item is the path of the component file, and the second item is the component props, for example:

```ts
import { defineConfig } from "rspress/config";
import { RspressPlugin } from "@rspress/shared";

export function pluginForDoc(): RspressPlugin {
  // component path
  const componentPath = path.join(__dirname, "xxx.tsx");
  return {
    // plugin name
    name: "plugin-comp",
    globalUIComponents: [
      [
        path.join(__dirname, "components", "MyComponent.tsx"),
        {
          foo: "bar",
        },
      ],
    ],
  };
}
```

import GlobalUIComponents from "../../fragments/global-ui-components.mdx";

<GlobalUIComponents />

### builderConfig

- **Type**：`BuilderConfig`

The bottom layer of Rspress is based on the Rspack mode of [Modern.js Builder](https://modernjs.dev/builder/) for document build process. The Builder can be configured through `builderConfig`. For specific configuration options, please refer to [Modern.js Builder](https://modernjs.dev/builder/api/index.html).

> Of course, if you want to configure Rspack directly, you can also configure it through `buildConfig.tools.rspack`.

```tsx
import { RspressPlugin } from "@rspress/shared";

export function pluginForDoc(slug: string): RspressPlugin {
  return {
    name: "plugin-name",
    // Global variable definitions for build phase
    builderConfig: {
      source: {
        define: {
          SLUG: JSON.stringify(slug),
        },
      },
      tools: {
        rspack(options) {
          // Modify rspack config
        },
      },
    },
  };
}
```

### config

- **Type**：`(config: DocConfig) => DocConfig | Promise<DocConfig>`

It is used to modify/extend the configuration of Rspress itself. For example, if you want to modify the title of the document, you can do it through `config`:

```tsx
import { RspressPlugin } from "@rspress/shared";

export function pluginForDoc(): RspressPlugin {
  return {
    name: "plugin-name",
    // Extend the config of the Rspress itself
    config(config) {
      return {
        ...config,
        title: "新的文档标题",
      };
    },
  };
}
```

### beforeBuild/afterBuild

- **Type**：`(config: DocConfig, isProd: boolean) => void | Promise<void>`

It is used to perform some operations before/after the document is built. The first parameter is the config of the document, and the second parameter is whether it is currently a production environment. The usage is as follows:

```tsx
import { RspressPlugin } from "@rspress/shared";

export function pluginForDoc(): RspressPlugin {
  return {
    name: "plugin-name",
    // Hook to execute before build
    async beforeBuild(config, isProd) {
      // Do something here
    },
    // Hook to execute after build
    async afterBuild(config, isProd) {
      // Do something here
    },
  };
}
```

tip
When the `beforeBuild` hook is executed, the `config` plugins of all plugins have been processed, so the config parameter already represents the final document configuration.

### markdown

- **Type**：`{ remarkPlugins?: Plugin[]; rehypePlugins?: Plugin[] }`

It is used to extend the compilation ability of Markdown/MDX. If you want to add custom remark/rehype plugins or MDX globalComponents, you can use `markdown` options to achieve:

```tsx
import { RspressPlugin } from "@rspress/shared";

export function pluginForDoc(): RspressPlugin {
  return {
    name: "plugin-name",
    markdown: {
      remarkPlugins: [
        // Add custom remark plugin
      ],
      rehypePlugins: [
        // Add custom rehype plugin
      ],
      globalComponents: [
        // Register global components for MDX
      ],
    },
  };
}
```

warning
When mdx-rs compilation is enabled (that is, `markdown.experimentalMdxRs` is `true` in the config file), the added remark/rehype plugin will be ignored.

### extendPageData

- Type: `(pageData: PageData) => void | Promise<void>`

```tsx
import { RspressPlugin } from "@rspress/shared";

export function pluginForDoc(): RspressPlugin {
  return {
    name: "plugin-name",
    // Extend the page data
    extendPageData(pageData) {
      // You can add or modify properties on the pageData object
      pageData.a = 1;
    },
  };
}
```

After extending the page data, you can access the page data through the `usePageData` hook in the theme.

```tsx
import { usePageData } from "rspress";

export function MyComponent() {
  const { page } = usePageData();
  // page.a === 1
  return <div>{page.a}</div>;
}
```

### addPages

- Type: `(config: UserConfig) => AddtionalPage[] | Promise<AddtionalPage[]>`

The `config` parameter is the `doc` config of `rspress.config.ts`, and the `AddtionalPage` type is defined as follows:

```tsx
interface AddtionalPage {
  routePath: string;
  filepath?: string;
  content?: string;
}
```

Used to add additional pages, you can return an array in the `addPages` function, each item in the array is a page config, you can specify the route of the page through `routePath`, through `filepath` or `content` to specify the content of the page. For example:

```tsx
import path from "path";
import { RspressPlugin } from "@rspress/shared";

export function docPluginDemo(): RspressPlugin {
  return {
    name: "add-pages",
    addPages(config, isProd) {
      return [
        //  Support the absolute path of the real file (filepath), which will read the content of md(x) in the disk
        {
          routePath: "/filepath-route",
          filepath: path.join(__dirname, "blog", "index.md"),
        },
        //  Support to directly pass in the content of md(x) through the content parameter
        {
          routePath: "/content-route",
          content: "# Demo2",
        },
      ];
    },
  };
}
```

`addPages` accepts two parameters, `config` is the config of the current document site, `isProd` indicates whether it is a production environment.

### routeGenerated

- **Type**：`(routeMeta: RouteMeta[]) => void | Promise<void>`

In this hook, you can get all the route meta information. The structure of each route meta information is as follows

```ts
export interface RouteMeta {
  // route path
  routePath: string;
  // file absolute path
  absolutePath: string;
  // The page name, as part of the chunk filename
  pageName: string;
  // language of current route
  lang: string;
}
```

例子:

```tsx
import { RspressPlugin } from "@rspress/shared";

export function pluginForDoc(): RspressPlugin {
  return {
    // plugin name
    name: "plugin-routes",
    // Hook to execute after route generated
    async routeGenerated(routes) {
      // Do something here
    },
  };
}
```