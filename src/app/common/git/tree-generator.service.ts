import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { TreeRow } from './tree/node';

@Injectable()
export class TreeGeneratorService {

    constructor() { }

    public createTree(commits: CommitModel[]): void {
        const tree: TreeRow[] = [];
        for (const commit of _.clone(commits).reverse()) {
            const row = new TreeRow();
            tree.push(row);

            row.addElement(0, {
                commit: commit,
            });
        }

        console.log(tree);
    }

}
