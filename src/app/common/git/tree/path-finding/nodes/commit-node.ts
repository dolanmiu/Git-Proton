import { Node, NodeType } from './node';

export class CommitNode extends Node {

    constructor() {
        super(NodeType.NODE, 1);
    }

    public toString(): string {
        return 'o';
    }
}
