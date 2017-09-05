import { EmptyNode, Node } from './nodes';

export class NodeStack {
    public nodes: Node[];
    public combined: Node;

    constructor() {
        this.nodes = [];
        this.nodes.push(new EmptyNode());
    }

    public addNode(node: Node): void {
        this.nodes.push(node);
    }

    public get Nodes(): Node[] {
        return this.nodes;
    }

    public get Combined(): Node {
        return this.nodes[this.nodes.length - 1];
    }
}
