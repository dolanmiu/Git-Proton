import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { CommitModel } from './commit-model';
import { Grid } from './path-finding/grid';
import { Node } from './path-finding/nodes';
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
            const commitNodes: Node[] = [];

            for (const parent of commit.parents) {
                commitNodes.push(grid.findNodeFromCommit(parent));
            }

            const paths = this.pathFinder.run(grid, commitNodes);
            for (const path of paths) {
                path.Destination = commit;
                grid.addPath(path);
                console.log(path);
            }
            console.log(grid.toString());
        }

        return grid;
    }
}
