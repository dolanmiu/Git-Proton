import { CommitNode, EmptyNode, Node, NodeType } from './nodes';

export class NodeStack {
    private nodes: Node[];

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

    public get CommitNode(): CommitNode {
        return this.nodes.find((node) => node.Type === NodeType.NODE);
    }

    public get HasCommitNode(): boolean {
        return this.nodes.find((node) => node.Type === NodeType.NODE) !== undefined;
    }
}
