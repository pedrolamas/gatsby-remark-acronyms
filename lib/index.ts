import visit from 'unist-util-visit';
import { Node } from 'unist';
import { Root, HTML, Text } from 'mdast';

type GatsbyRemarkPluginParameters = {
  markdownAST: Root;
};

type PluginOptions = {
  acronyms: {
    [key: string]: string;
  };
};

const Plugin = ({ markdownAST }: GatsbyRemarkPluginParameters, pluginOptions = {} as PluginOptions): Node => {
  const { acronyms } = pluginOptions;

  if (!acronyms) return markdownAST;

  const acronymsRegExp = new RegExp(`\\b(${Object.keys(acronyms).join('|')})\\b`, 'g');

  visit<Text>(markdownAST, 'text', (node, index, parent) => {
    if (node.value && parent) {
      const newNodes = node.value.split(acronymsRegExp).map((value) => {
        const acronymTitle = acronyms[value];

        return acronymTitle
          ? ({
              type: 'html',
              value: `<abbr title="${acronymTitle}">${value}</abbr>`,
            } as HTML)
          : ({
              type: 'text',
              value,
            } as Text);
      });

      parent.children.splice(index, 1, ...newNodes);

      return index + newNodes.length;
    }

    return index + 1;
  });

  return markdownAST;
};

export = Plugin;
