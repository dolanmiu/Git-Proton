interface TreeRow {
    commit: CommitModel;
}

export class Node {
    private row: TreeRow[];

    constructor() {
        this.row = [];
    }
}
