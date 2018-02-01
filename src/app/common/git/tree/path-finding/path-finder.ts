import { CommitModel } from 'app/common/git/tree/commit-model';
import { DistanceMap } from './distance-map';
import { Grid } from './grid';
import { NodeStack } from './node-stack';
import { Path } from './path';
import { PathMap } from './path-map';
import { PriorityQueue } from './priority-queue';

export class PathFinder {

    public run(grid: Grid, parents: NodeStack[], data: CommitModel): Path<CommitModel>[] {
        const startNodes = parents.length === 0 ? [grid.StartNode] : parents;

        return this.runForParents(grid, startNodes, data);
    }

    private runForParents(grid: Grid, startNodes: NodeStack[], data: CommitModel): Path<CommitModel>[] {
        const paths: Path<CommitModel>[] = [];
        let endNode: NodeStack;

        for (const startNode of startNodes) {
            const path = this.findPath(grid, startNode, data, endNode);
            paths.push(path);

            if (!endNode) {
                endNode = grid.get(paths[0].EndPosition);
            }
        }

        return paths;
    }

    private findPath(grid: Grid, start: NodeStack, data: CommitModel, end?: NodeStack): Path<CommitModel> {
        const map = new PathMap();
        const openList = new PriorityQueue();
        const distances = new DistanceMap();

        if (!grid.checkIfNodeExists(start)) {
            throw new Error('start node not found');
        }

        openList.enQueue(start, 0);
        distances.set(start, 0);

        let nextCurrentNode: NodeStack;
        do {
            nextCurrentNode = openList.deQueue();
            this.pass(grid, map, openList, distances, nextCurrentNode, end);
        }
        while (end ? nextCurrentNode !== end : !grid.isOnTop(nextCurrentNode));

        return map.convertToPath(grid, nextCurrentNode, start, data);
    }

    // tslint:disable-next-line:max-line-length
    private pass(grid: Grid, map: PathMap, openList: PriorityQueue, distances: DistanceMap, currentNode: NodeStack, exclusion?: NodeStack): void {
        const neighbors = grid.findNeighbors(currentNode);

        for (const neighbor of neighbors) {
            if (neighbor.CommitNode) {
                continue;
            }

            const currentDistance = distances.getDistance(currentNode);
            const newDistance = currentDistance + neighbor.Cost;
            const neighborDistance = distances.getDistance(neighbor);
            if (newDistance > neighborDistance) {
                continue;
            }

            openList.enQueue(neighbor, newDistance);
            distances.set(neighbor, newDistance);
            map.set(neighbor, currentNode);
        }
    }
}
