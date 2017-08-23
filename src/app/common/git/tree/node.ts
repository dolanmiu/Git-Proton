import * as _ from 'lodash';

export class TreeRow {
    private row: TreeNode[];

    constructor() {
        this.row = [];
    }

    public addElement(index: number, node: TreeNode): void {
        const currentMaxIndex = this.row.length - 1;

        if (index > currentMaxIndex) {
            const difference = index - currentMaxIndex;
            _.concat(this.row, _.times(difference, _.constant(undefined)));
        }

        this.row[index] = node;
    }
}
