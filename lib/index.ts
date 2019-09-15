import visit from 'unist-util-visit';
import { Node } from 'unist';

type GatsbyRemarkPluginParameters = {
  markdownAST: Node;
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

  visit(markdownAST, 'text', (node, index, parent) => {
    if (node.value && typeof node.value === 'string') {
      const newNodes = node.value.split(acronymsRegExp).map(value => {
        const acronymTitle = acronyms[value];

        return acronymTitle
          ? {
              type: 'html',
              value: `<acronym title="${acronymTitle}">${value}</acronym>`,
            }
          : {
              type: 'text',
              value,
            };
      });

      parent.children.splice(index, 1, ...newNodes);

      return index + newNodes.length;
    }

    return index + 1;
  });

  return markdownAST;
};

export = Plugin;
