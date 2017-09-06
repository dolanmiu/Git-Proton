export const enum NodeType {
    NONE, VERTICAL, HORIZONTAL, NODE,
}

export class Node {
    constructor(private type: NodeType, private cost: number) {
    }

    public get Type(): NodeType {
        return this.type;
    }

    public get Cost(): number {
        return this.cost;
    }
}
