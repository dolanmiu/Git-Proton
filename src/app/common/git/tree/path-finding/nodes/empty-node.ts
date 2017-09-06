import { Node, NodeType } from './node';

export class EmptyNode extends Node {

    constructor() {
        super(NodeType.NONE, 1);
    }

    public toString(): string {
        return ' ';
    }
}
