import { DistanceMap } from './distance-map';
import { Grid } from './grid';
import { NodeStack } from './node-stack';
import { Path } from './path';
import { PathMap } from './path-map';
import { PriorityQueue } from './priority-queue';

export class PathFinder {

    public run(grid: Grid, parents: NodeStack[]): Path[] {
        if (parents.length === 0) {
            return this.runForNoParent(grid);
        } else {
            return this.runForParents(grid, parents);
        }
    }

    private runForNoParent(grid: Grid): Path[] {
        const paths: Path[] = [];

        paths.push(this.findPath(grid, grid.StartNode));

        return paths;
    }

    private runForParents(grid: Grid, parents: NodeStack[]): Path[] {
        const paths: Path[] = [];
        let endNode: NodeStack;

        for (const parent of parents) {
            const path = this.findPath(grid, parent, endNode);
            path.PreviousDestination = grid.getCoordinates(parent);
            paths.push(path);

            if (!endNode) {
                endNode = grid.findNode(paths[0].EndPosition);
            }
        }

        return paths;
    }

    private findPath(grid: Grid, start: NodeStack, end?: NodeStack): Path {
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

        return map.convertToPath(grid, nextCurrentNode);
    }

    // tslint:disable-next-line:max-line-length
    private pass(grid: Grid, map: PathMap, openList: PriorityQueue, distances: DistanceMap, currentNode: NodeStack, exclusion?: NodeStack): void {
        const neighbours = grid.findNeighbours(currentNode);

        for (const neighbour of neighbours) {
            if (neighbour.CommitNode) {
                continue;
            }

            const currentDistance = distances.getDistance(currentNode);
            const newDistance = currentDistance + neighbour.Cost;
            const neighbourDistance = distances.getDistance(neighbour);
            if (newDistance > neighbourDistance) {
                continue;
            }

            openList.enQueue(neighbour, newDistance);
            distances.set(neighbour, newDistance);
            map.set(neighbour, currentNode);
        }
    }
}
