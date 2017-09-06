import { Node, NodeType } from './node';

export class HorizontalNode extends Node {

    constructor() {
        super(NodeType.HORIZONTAL, 1);
    }

    public toString(): string {
        return '-';
    }
}
