import { Node, NodeType } from './node';

export class EmptyNode extends Node {

    constructor() {
        super(NodeType.NONE, 1);
    }
}
