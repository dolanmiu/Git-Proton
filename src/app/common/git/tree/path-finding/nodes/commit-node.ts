import { Node, NodeType } from './node';

export class CommitNode extends Node {

    constructor() {
        super(NodeType.NODE, 1);
    }
}
