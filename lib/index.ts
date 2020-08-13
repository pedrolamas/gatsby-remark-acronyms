import visit from 'unist-util-visit';
import { Node } from 'unist';

type GatsbyRemarkPluginParameters = {
  markdownAST: Node;
};

type PluginOptions = {
  dataAttribute?: string;
  acronyms: {
    [key: string]: string;
  };
};

const Plugin = ({ markdownAST }: GatsbyRemarkPluginParameters, pluginOptions = {} as PluginOptions): Node => {
  const { acronyms, dataAttribute } = pluginOptions;

  if (!acronyms) return markdownAST;

  const acronymsRegExp = new RegExp(`\\b(${Object.keys(acronyms).join('|')})\\b`, 'g');

  visit(markdownAST, 'text', (node, index, parent) => {
    if (node.value && typeof node.value === 'string') {
      const newNodes = node.value.split(acronymsRegExp).map(value => {
        const acronymTitle = acronyms[value];

        if (acronymTitle) {
          const valueHTML = dataAttribute ? `<abbr ${dataAttribute}="${acronymTitle}">${value}</abbr>` : `<abbr title="${acronymTitle}">${value}</abbr>`;

          return {
            type: 'html',
            value: valueHTML,
          };
        } else {
          return {
            type: 'text',
            value,
          };
        }
      });

      parent.children.splice(index, 1, ...newNodes);

      return index + newNodes.length;
    }

    return index + 1;
  });

  return markdownAST;
};

export = Plugin;
