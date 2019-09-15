declare module 'unist-util-visit' {
  import { Node, Parent } from 'unist';

  namespace visit {
    type Visitor<V extends Node> = (node: V, index: number, parent: Parent) => void | number;
  }

  const visit: {
    <V extends Node>(tree: Node, test: string, visitor: visit.Visitor<V>, reverse?: boolean): void;

    (tree: Node, visitor: visit.Visitor<Node>, reverse?: boolean): void;
  };

  export default visit;
}
