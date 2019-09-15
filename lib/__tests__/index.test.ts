import Remark from 'remark';
import visit from 'unist-util-visit';

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
    const markdownAST = remark.parse('I like HTML!');

    const transformed = plugin({ markdownAST }, pluginSettings);

    visit(transformed, 'acronym', node => {
      expect(node.title).toBe(pluginSettings.acronyms.HTML);
    });

    expect(transformed).toMatchSnapshot();
  });

  it('acronyms are case sensitive', () => {
    const markdownAST = remark.parse('I like Html!');

    const transformed = plugin({ markdownAST }, pluginSettings);

    let found = false;

    visit(transformed, 'acronym', () => {
      found = true;
    });

    expect(found).toBeFalsy();

    expect(transformed).toMatchSnapshot();
  });

  it('acronyms are full words', () => {
    const markdownAST = remark.parse('I like XHTML!');

    const transformed = plugin({ markdownAST }, pluginSettings);

    let found = false;

    visit(transformed, 'acronym', () => {
      found = true;
    });

    expect(found).toBeFalsy();

    expect(transformed).toMatchSnapshot();
  });

  it('does not change render if no acronym is found in markdown text', () => {
    const markdownAST = remark.parse('No acronyms on this text!');

    const transformed = plugin({ markdownAST }, pluginSettings);

    let found = false;

    visit(transformed, 'acronym', () => {
      found = true;
    });

    expect(found).toBeFalsy();

    expect(transformed).toMatchSnapshot();
  });
});
