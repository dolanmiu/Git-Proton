import { Node, NodeType } from './node';

export class VerticalNode extends Node {

    constructor() {
        super(NodeType.VERTICAL, 100);
    }
}
