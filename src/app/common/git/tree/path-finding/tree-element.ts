export const enum TreeElementType {
    NONE, PIPE, LINE, NODE,
}

export class TreeElement {
    constructor(private type: TreeElementType) {

    }

    public get Type(): TreeElementType {
        return this.type;
    }
}
