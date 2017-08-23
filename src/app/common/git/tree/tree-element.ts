export const enum TreeElementType {
    NODE, PIPE, CORNER,
}

export class TreeElement {
    constructor(private type: TreeElementType) {

    }

    public get Type(): TreeElementType {
        return this.type;
    }
}
