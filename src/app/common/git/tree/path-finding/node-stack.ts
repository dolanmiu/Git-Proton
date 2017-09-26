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

    public get CommitNode(): DataNode<CommitModel> {
        return this.nodes.find((node) => node.Type === NodeType.NODE) as DataNode<CommitModel>;
    }

    public get Cost(): number {
        const costs = this.nodes.map((x) => x.Cost);

        if (costs.length === 0) {
            return 1;
        }

        return Math.max(...costs);
    }

    public toString(): string {
        if (this.CommitNode) {
            return 'o';
        }

        if (this.nodes.length === 0) {
            return ' ';
        }

        return '.';
    }
}
