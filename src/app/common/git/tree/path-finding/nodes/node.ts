export const enum NodeType {
    NONE, PIPE, LINE, NODE,
}

export class Node {
    constructor(private type: NodeType) {

    }

    public get Type(): NodeType {
        return this.type;
    }
}
