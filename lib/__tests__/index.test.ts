import Remark from 'remark';
import visit from 'unist-util-visit';
import { Root, HTML } from 'mdast';

import plugin from '..';

const pluginSettings = {
  acronyms: {
    CSS: 'Cascading Style Sheets',
    HTML: 'Hypertext Markup Language',
  },
};

const remark = Remark().data('settings', {
  commonmark: true,
  footnotes: true,
  pedantic: true,
});

describe('gatsby-remark-acronyms', () => {
  it('renders acronym when one is found on markdown text', () => {
    const markdownAST = remark.parse('I like HTML!') as Root;

    const transformed = plugin({ markdownAST }, pluginSettings);

    let count = 0;

    visit<HTML>(transformed, 'html', (node) => {
      if (node.value === '<abbr title="Hypertext Markup Language">HTML</abbr>') {
        count++;
      }
    });

    expect(count).toEqual(1);

    expect(transformed).toMatchSnapshot();
  });

  it('acronyms are case sensitive', () => {
    const markdownAST = remark.parse('I like Html!') as Root;

    const transformed = plugin({ markdownAST }, pluginSettings);

    let count = 0;

    visit(transformed, 'html', () => {
      count++;
    });

    expect(count).toEqual(0);

    expect(transformed).toMatchSnapshot();
  });

  it('acronyms are full words', () => {
    const markdownAST = remark.parse('I like XHTML!') as Root;

    const transformed = plugin({ markdownAST }, pluginSettings);

    let count = 0;

    visit(transformed, 'html', () => {
      count++;
    });

    expect(count).toEqual(0);

    expect(transformed).toMatchSnapshot();
  });

  it('does not change render if no acronym is found in markdown text', () => {
    const markdownAST = remark.parse('No acronyms on this text!') as Root;

    const transformed = plugin({ markdownAST }, pluginSettings);

    let count = 0;

    visit(transformed, 'html', () => {
      count++;
    });

    expect(count).toEqual(0);

    expect(transformed).toMatchSnapshot();
  });
});
