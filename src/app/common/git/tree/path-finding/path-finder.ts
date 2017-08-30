import { CommitModel } from '../commit-model';
import { Grid } from './grid';
import { PriorityQueue } from './priority-queue';
import { TreeElement, TreeElementType } from './tree-element';

interface Path {
    nodes: Vector[];
}

export class PathFinder {

    public run(grid: Grid, commitToPlace: CommitModel, start?: TreeElement): Path {
        const path = new Map<TreeElement, TreeElement>();
        const openList = new PriorityQueue();
        const closedList: TreeElement[] = [];
        const distances = new Map<TreeElement, number>();

        const startNode = start ? start : grid.get(0, 0);

        openList.enQueue(startNode, 0);
        distances.set(startNode, 0);

        while (openList.HasItems) {
            const nextCurrentNode = openList.deQueue();

            closedList.push(nextCurrentNode);
            this.pass(grid, path, openList, distances, nextCurrentNode);
        }

        return undefined;
    }

    // tslint:disable-next-line:max-line-length
    private pass(grid: Grid, path: Map<TreeElement, TreeElement>, openList: PriorityQueue, distances: Map<TreeElement, number>, currentNode: TreeElement): void {
        const neighbours = grid.findNeighbours(currentNode);

        for (const neighbour of neighbours) {
            if (neighbour.Type === TreeElementType.PIPE) {
                continue;
            }

            const currentDistance = this.getDistance(distances, currentNode);
            const newDistance = currentDistance + 1;
            const neighbourDistance = this.getDistance(distances, neighbour);
            if (newDistance > neighbourDistance) {
                continue;
            }

            openList.enQueue(neighbour, newDistance);
            distances.set(neighbour, newDistance);
            path.set(currentNode, neighbour);
        }
    }

    private getDistance(distances: Map<TreeElement, number>, node: TreeElement): number {
        const distance = distances.get(node);

        return distance !== undefined ? distance : Number.MAX_SAFE_INTEGER;
    }

    // private convertToPath(map: Map<PathDataCache, PathDataCache>, start: PathDataCache): Path {
    //     const path: Vector[] = [];
    //     const currentNode = start;

    //     while (map.get(currentNode)) {
    //         path.push(currentNode.node);
    //         smallest = previous[smallest];
    //     }
    // }
}
