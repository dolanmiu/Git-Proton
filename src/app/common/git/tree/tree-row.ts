import * as _ from 'lodash';

import { CommitModel } from './commit-model';
import { TreeElement } from './tree-element';

export class TreeRow {
    private row: TreeElement[];

    constructor() {
        this.row = [];
    }

    public addElement(index: number, node: TreeElement): void {
        const currentMaxIndex = this.row.length - 1;

        if (index > currentMaxIndex) {
            const difference = index - currentMaxIndex;
            _.concat(this.row, _.times(difference, _.constant(undefined)));
        }

        this.row[index] = node;
    }

    public get ColumnIndex(): number {
        for (let i = 0; i < this.row.length; i++) {
            if (this.row[i] !== undefined && this.row[i] instanceof CommitModel) {
                return i;
            }
        }

        throw new Error('Cannot find CommitModel');
    }
}
