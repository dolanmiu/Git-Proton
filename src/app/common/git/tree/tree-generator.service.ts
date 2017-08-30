import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { CommitModel } from './commit-model';
import { Grid } from './path-finding/grid';
import { PathFinder } from './path-finding/path-finder';

@Injectable()
export class TreeGeneratorService {

    private pathFinder: PathFinder;

    constructor() {
        this.pathFinder = new PathFinder();
    }

    public createTree(commits: CommitModel[]): void {
        commits = _.clone(commits).reverse();

        const grid = new Grid();

        for (const commit of commits) {
            grid.addRow();
            this.pathFinder.run(grid, commit, commit.parents[0]);
            console.log(grid.toString());
        }

    }

}
