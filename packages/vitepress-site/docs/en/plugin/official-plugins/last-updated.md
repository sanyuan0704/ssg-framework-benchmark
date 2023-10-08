# @rspress/plugin-last-updated

> [Source Code](https://github.com/web-infra-dev/rspress/tree/main/packages/plugin-last-updated)

## Introduction

`@rspress/plugin-last-updated` is a plugin for displaying the last updated time in articles.

tip Tip

When you have configured `lastUpdated: true` in the default theme, this plugin will be automatically activated.

## Installation

## Usage

### 1. Register the Plugin

```ts
import { lastUpdated } from "@rspress/plugin-last-updated";
import { defineConfig } from "rspress/config";

export default defineConfig({
  plugins: [lastUpdated()],
});
```

### 2. Access at Runtime

After registering the plugin, you can get the last updated timestamp of the article at runtime. Here's an example:

```ts
import { usePageData } from "rspress/runtime";

function MyComponent() {
  const pageData = usePageData();
  return <div>{pageData.page.lastUpdatedTime}</div>;
}
```