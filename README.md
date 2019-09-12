# gatsby-remark-acronyms

Gatsby Remark plugin to show description tootips for acronyms found in text.

## Status

[![npm version](https://img.shields.io/npm/v/gatsby-remark-acronyms)](https://www.npmjs.com/package/gatsby-remark-acronyms)

## Installation

```sh
npm install --save gatsby-node-helpers
```

or

```sh
yarn add gatsby-node-helpers
```

## How to use

```js
// In your gatsby-config.js
plugins: [
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-acronyms`,
          options: {
            acronyms: {
              CSS: `Cascading Style Sheets`,
              HTML: `Hypertext Markup Language`
            }
          },
        },
      ],
    },
  },
]
```

## Options

| Name       | Default | Description                                                     |
| ---------- | ------- | --------------------------------------------------------------- |
| `acronyms` |         | Object containing keys for acronyms and values for descriptions |
