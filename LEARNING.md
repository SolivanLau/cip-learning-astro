# Learnings

## 📝 Project Overview

This is a project based on a series of Coding In Publics <a href="https://learnastro.dev/">Learn Astro Series</a>, focusing on **Markdown and MDX** usage in Astro!

## Learning Concept

### Markdown

**Documentation:**

- [Markdown](https://www.markdownguide.org/cheat-sheet/)
- [Markdown in Astro](https://docs.astro.build/en/guides/markdown/)

Markdown is one of the easiest ways to write content for the web. It's a simple text format makes it relatively easy to read and write, but powerful enough for complex content.

With Astro, Markdown works great for static content. We can start by creating an `import` statement to bring `.md` files into an astro file/component.

```astro
---
import { Content as Markdown } from "../my-dir/my-file.md";
---

<Markdown />
```

> **Note:** Keyword, `Content`, is one of the many properties within an imported markdown file. This is a default component that returns full rendered contents of a markdown file. We can use an _alias_ in case we are dealing with multiple files.

This is as simple as we can start - Astro will import the file and...

- convert your Markdown into HTML
- render the HTML

This is very similar to using Astro's [Fragments](https://docs.astro.build/en/reference/astro-syntax/#fragments) and using the [set:html](https://docs.astro.build/en/reference/directives-reference/#sethtml) directive to render the content.

> **Note:** This is a **very simple** example of how to use Markdown in Astro. If we want to consider type safety, we can look into [Astro's Content Collections](https://docs.astro.build/en/reference/modules/astro-content/#_top) with a plethora of configuration options.

### Markdown & Routing

Working in it's simplest form, the `pages` folder in Astro is the root of setting your websites content. To review, routing works with the following files:

- `.html`
- `.astro`
- `.md`
- `.mdx`

We define our website navigation with directories and add folders where they need be. For instance, a blog might have the following structure:

```text
├── pages
│   └── blog
│       ├── post-1.md
│       ├── post-2.html
│       ├── post-3.mdx
│       └── popular
│           ├── post-1.md
│           ├── post-2.html
│           └── post-3.mdx
```

> **Note:** Using md files can limit styling...

### Markdown and Astro Components

We can use a wrapper `layout` component to render content with familiar styles, but also leverage other properties with Astro markdown imports.

In any markdown file, we can wrap our content in a component in the `.md` YAML frontmatter with the `layout` property.

```yaml
---
title: "Markdown & MDX"
layout: "../layouts/BlogLayout.astro"
# other frontmatter properties
---
```

Take a look at the `BlogLayout.astro` file. When we `console.log(Astro.props)` we can see we have access to properties about our markdown:

```js
{
  file: 'C:/Users/Solivan/Documents/personal/web-dev/learning/cip-astro/exercises/cip-learning-astro/src/pages/blog/post-1.md',
  url: '/blog/post-1',
  content: {
    title: 'Post 1 - Markdown, Astro, and Routing',
    file: 'C:/Users/Solivan/Documents/personal/web-dev/learning/cip-astro/exercises/cip-learning-astro/src/pages/blog/post-1.md',
    url: '/blog/post-1'
  },
  frontmatter: {
    title: 'Post 1 - Markdown, Astro, and Routing',
    file: 'C:/Users/Solivan/Documents/personal/web-dev/learning/cip-astro/exercises/cip-learning-astro/src/pages/blog/post-1.md',
    url: '/blog/post-1'
  },
  headings: [
    {
      depth: 1,
      slug: 'markdown-astro-and-routing',
      text: 'Markdown, Astro, and Routing'
    }
  ],
  rawContent: [Function: rawContent],
  compiledContent: [AsyncFunction: compiledContent],
  'server:root': true
}
```

As a quick refresher:

**Documentation:**[Markdown Properties](https://docs.astro.build/en/guides/markdown-content/#available-properties)

- `frontmatter`: access YAML frontmatter data in a markdown file.
- `<Content />`: return full rendered contents of a markdown file.
- `rawContent()`: function returning raw markdown content in a string.
- `getHeadings()`: function returning an array of headings in a markdown file with depth.

There are many more to explore, but this is the main concepts to get started with.

### Importing MD files

we can import

- single files
- multiple files with [`import.meta.glob`](https://docs.astro.build/en/guides/imports/#importmetaglob)
- content collections... we will learn from later on

```astro
---
// frontmatter
// single file
import * as content from "../content/*.md";

// multiple files with import meta glob
const post = import.meta.glob("../content/*.md");
---
```

### MDX in Astro

We can instantly add MDX via the Astro CLI:

```bash
pnpm astro add mdx
```

> **Note:** Using Astro CLI does not only install dependencies, but alsoautomates set up needed in `astro.config.mjs`.

We can then leverage basics of MDX in our markdown files:

- use [frontmatter variables](https://docs.astro.build/en/guides/integrations-guide/mdx/#using-frontmatter-variables-in-mdx) within the .mdx file itself.
- export, create, and use [variables](https://docs.astro.build/en/guides/integrations-guide/mdx/#using-exported-variables-in-mdx) outside of YAML frontmatter
- use framework and non-framework [components](https://docs.astro.build/en/guides/integrations-guide/mdx/#using-components-in-mdx) in a markdown file.

```mdx
---
title: "Markdown & MDX"
---

import Button from "../components/Button.astro";
export const extraTitle = "Hello world!";

# Hello from mdx land!

Here is mdx accessing the frontmatter within the file itself: {frontmatter.title}

## {extraTitle} with exported variables
```

> **Note:** when importing `.mdx` content into an `.astro` file, custom components can be passed into the component via the `components` property.

```mdx
---
import { Content, components } from '../content.mdx';
import Heading from '../Heading.astro';
---

{/* Creates a custom <h1> for the # syntax, _and_ applies any custom components defined in `content.mdx` */}

<Content components={{ ...components, h1: Heading }} />
```

We can also replace **vanilla** html elements with custom components in mdx by **exporting a components object** .

```mdx
import Blockquote from "../components/Blockquote.astro";

{/* assigning custom Blockquote component to the `blockquote` html element */}
export const components = { blockquote: Blockquote };

> **Blockquote:** This should be using my custom styling from the `Blockquote.astro` component.
```
