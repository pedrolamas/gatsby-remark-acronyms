# gatsby-remark-acronyms

[![npm version](https://img.shields.io/npm/v/gatsby-remark-acronyms)](https://www.npmjs.com/package/gatsby-remark-acronyms)

Gatsby Remark plugin to show description tooltips for acronyms found in text.

## Installation

```sh
npm install --save gatsby-remark-acronyms
```

or

```sh
yarn add gatsby-remark-acronyms
```

## How to use

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-acronyms`,
          options: {
            acronyms: {
              CSS: `Cascading Style Sheets`,
              HTML: `Hypertext Markup Language`,
            },
          },
        },
      ],
    },
  },
];
```

## Options

| Name       | Default | Description                                                     |
| ---------- | ------- | --------------------------------------------------------------- |
| `acronyms` |         | Object containing keys for acronyms and values for descriptions |

## Usage in Markdown

```text
My site uses HTML and CSS!
```

Given the configuration presented above and this small markdown snippet, the rendered HTML output would be:

```html
<p>My site uses <abbr title="Hypertext Markup Language">HTML</abbr> and <abbr title="Cascading Style Sheets">CSS</abbr>!</p>
```

## Styling

Just globally style the `abbr` element as you would any other element through a style sheet.

If you are using the plugin with [MDX](https://mdxjs.com/), you can use [MDXProvider](https://mdxjs.com/getting-started#mdxprovider) to completely control how the `abbr` element should be rendered:

```jsx
// src/App.js
import React from 'react';
import { MDXProvider } from '@mdx-js/react';

const Acronym = (props) => <abbr style={{ color: 'green' }} {...props} />;

const components = {
  abbr: Acronym,
};

export default (props) => (
  <MDXProvider components={components}>
    <main {...props} />
  </MDXProvider>
);
```

## License

MIT
