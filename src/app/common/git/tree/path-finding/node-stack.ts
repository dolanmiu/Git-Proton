import { CommitModel } from '../commit-model';
import { DataNode, Node, NodeType } from './nodes';

export class NodeStack {
    private nodes: Node[];

    constructor() {
        this.nodes = [];
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

    public get CommitNode(): DataNode<CommitModel> {
        return this.nodes.find((node) => node.Type === NodeType.NODE) as DataNode<CommitModel>;
    }

    public get HasCommitNode(): boolean {
        return this.nodes.find((node) => node.Type === NodeType.NODE) !== undefined;
    }
}
