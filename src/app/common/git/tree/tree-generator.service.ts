import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { CommitModel } from './commit-model';
import { Grid } from './path-finding/grid';
import { Path } from './path-finding/path';
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
            const paths = this.pathFinder.run(grid, commit.parents);
            for (const path of paths) {
                this.addNodesToGrid(grid, path, commit);
                console.log(path);
            }
            console.log(grid.toString());
        }

    }

    private addNodesToGrid(grid: Grid, path: Path, commit: CommitModel): void {
        for (const data of path.createPathNodes(commit)) {
            grid.set(data.position, data.node);
        }
    }

}
