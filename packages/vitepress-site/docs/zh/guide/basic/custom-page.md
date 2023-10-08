# 自定义页面

Rspress 提供了多种方式能让你自定义页面的内容，包括：

- 添加自定义全局组件；
- 添加自定义全局样式；
- 自定义页面布局结构。

## 自定义全局组件

某些场景下，你可能需要在页面中添加一些自定义的全局组件，框架提供了一个配置项 `globalUIComponents` 来实现这个功能。

### 使用方法

在 `rspress.config.ts` 中添加以下配置：

```ts
import { defineConfig } from "rspress/config";
import path from "path";

export default defineConfig({
  globalUIComponents: [path.join(__dirname, "components", "MyComponent.tsx")],
});
```

`globalUIComponents` 的每一项可以是一个字符串，代表组件的文件路径；也可以是一个数组，第一项为组件的文件路径，第二项为组件的 props 对象，比如：

```ts
import { defineConfig } from "rspress/config";

export default defineConfig({
  globalUIComponents: [
    [
      path.join(__dirname, "components", "MyComponent.tsx"),
      {
        foo: "bar",
      },
    ],
  ],
});
```

import GlobalUIComponents from "@zh/fragments/global-ui-components.mdx";

<GlobalUIComponents />

## 自定义样式

某些场景下，你可能需要在主题 UI 的基础上添加一些全局样式，框架提供了一个配置项 `globalStyles` 来实现这个功能。

### 使用方法

在 `rspress.config.ts` 中添加以下配置：

```ts
import { defineConfig } from "rspress/config";
import path from "path";

export default defineConfig({
  globalStyles: path.join(__dirname, "styles/index.css"),
});
```

然后可以添加以下代码：

```css
/* styles/index.css */
:root {
  --rp-c-brand: #f00;
}
```

这样框架会自动搜集所有的全局样式并合并到最终的样式文件中。

下面列举一些常用的全局样式：

```css
/* styles/index.css */

:root {
  /* 修改主题色 */
  --rp-c-brand: #f00;
  --rp-c-brand-dark: #ffa500;
  --rp-c-brand-darker: #c26c1d;
  --rp-c-brand-light: #f2a65a;
  --rp-c-brand-lighter: #f2a65a;
  /* 修改左侧侧边栏宽度 */
  --rp-sidebar-width: 280px;
  /* 修改右侧大纲栏宽度 */
  --rp-aside-width: 256px;
  /* 修改代码块标题背景 */
  --rp-code-title-bg: rgba(250, 192, 61, 0.15);
  /* 修改代码块内容背景 */
  --rp-code-block-bg: rgba(214, 188, 70, 0.05);
}
```

> 如果想了解更多内部的全局样式，可以查看 [vars.css](https://github.com/web-infra-dev/rspress/blob/main/packages/core/src/theme-default/styles/vars.css)

## 自定义布局结构

Rspress 提供了 `pageType` 配置来让你自定义页面的布局结构。

### 使用 pageType

Rspress 的约定式路由支持了两种路由，一种是文档路由，即用 md(x) 文件编写的页面，另一种是组件路由，即 `.jsx/.tsx` 文件编写的页面。

对于前者，你可以在 frontmatter 中添加 `pageType` 字段来指定页面的布局结构，比如：

```mdx
---
pageType: custom
---
```

对于后者，你可以添加如下的导出来指定 `pageType`：

```tsx
// 导出 frontmatter 对象，其含义与 md(x) 文件中的 frontmatter 一致
export const frontmatter = {
  // 声明布局类型
  pageType: "custom",
};
```

pageType 可以配置为如下的值：

import PageType from "@zh/fragments/page-type.mdx";

<PageType />

### 使用细粒度开关

除了 `pageType` 页面布局级别的配置之外，Rspress 还提供了更细粒度的开关，你可以在 frontmatter 配置其它的字段，这些字段及其含义如下：

- `navbar`：是否展示侧边栏，当你想要隐藏顶部导航栏时，可以配置为 `false`；
- `sidebar`：是否展示侧边栏，当你想要隐藏侧边栏时，可以配置为 `false`；
- `outline`：是否展示大纲栏，当你想要隐藏大纲栏时，可以配置为 `false`。

示例：

```mdx
---
navbar: false
sidebar: false
outline: false
---
```