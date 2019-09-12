const visit = require('unist-util-visit');

module.exports = ({ markdownAST }, pluginOptions = {}) => {
  const { acronyms } = pluginOptions;

  if (!acronyms) return;

  const acronymsRegExp = new RegExp(
    `\\b(${Object.keys(acronyms).join('|')})\\b`,
    'g',
  );

  visit(markdownAST, 'text', (node, index, parent) => {
    if (node.type === 'text' && node.value) {
      const newNodes = node.value.split(acronymsRegExp).map((value) => {
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
};
