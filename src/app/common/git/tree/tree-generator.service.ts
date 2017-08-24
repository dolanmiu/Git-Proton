import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { CommitModel } from './commit-model';
import { TreeRow } from './tree-row';

@Injectable()
export class TreeGeneratorService {

    constructor() { }

    public createTree(commits: CommitModel[]): void {
        const tree: TreeRow[] = [];

        commits = _.clone(commits).reverse();

        for (let i = 0; i < commits.length; i++) {
            const row = new TreeRow();
            tree.push(row);

            const commit = commits[i];

            if (commit.parents.length === 0) {
                row.addElement(0, commit);
            }

            for (const parent of commit.parents) {
                if (commit.checkIfParent(parent)) {
                    console.log(true);
                    row.addElement(tree[i - 1].ColumnIndex, commit);
                } else {
                    console.log(false);
                    row.addElement(tree[i - 1].ColumnIndex + 1, commit);
                }
            }
        }

        console.log(tree);
    }

}
