import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { CommitModel } from './commit-model';
import { Grid } from './path-finding/grid';
import { NodeStack } from './path-finding/node-stack';
import { PathFinder } from './path-finding/path-finder';

@Injectable()
export class TreeGeneratorService {

    private pathFinder: PathFinder;

    constructor() {
        this.pathFinder = new PathFinder();
    }

    public createTree(commits: CommitModel[]): Grid {
        commits = _.clone(commits).reverse();

        const grid = new Grid();

        for (const commit of commits) {
            const commitNodes: NodeStack[] = [];

            for (const parent of commit.parents) {
                commitNodes.push(grid.findNodeFromCommit(parent));
            }

            const paths = this.pathFinder.run(grid, commitNodes, commit);
            for (const path of paths) {
                grid.addPath(path);
                console.log(path);
            }
            grid.patchPaths();
            console.log(grid.toString());
        }

        return grid;
    }
}
