import { Grid } from './grid';
import { Node, NodeType } from './nodes';
import { Path } from './path';
import { PriorityQueue } from './priority-queue';

export class PathFinder {

    public run(grid: Grid, start?: Node[]): Path {
        const map = new Map<Node, Node>();
        const openList = new PriorityQueue();
        const distances = new Map<Node, number>();
        const startNode = start ? start[0] : grid.get(0, 0);

        if (!grid.checkIfNodeExists(startNode)) {
            throw new Error('start node not found');
        }

        openList.enQueue(startNode, 0);
        distances.set(startNode, 0);

        let nextCurrentNode: Node;
        do {
            nextCurrentNode = openList.deQueue();
            this.pass(grid, map, openList, distances, nextCurrentNode);
        }
        while (!grid.isOnTop(nextCurrentNode));

        return this.convertToPath(grid, map, nextCurrentNode);
    }

    // tslint:disable-next-line:max-line-length
    private pass(grid: Grid, map: Map<Node, Node>, openList: PriorityQueue, distances: Map<Node, number>, currentNode: Node): void {
        const neighbours = grid.findNeighbours(currentNode);

        for (const neighbour of neighbours) {
            if (neighbour.Type === NodeType.PIPE || neighbour.Type === NodeType.NODE) {
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
            map.set(neighbour, currentNode);
        }
    }

    private getDistance(distances: Map<Node, number>, node: Node): number {
        const distance = distances.get(node);

        return distance !== undefined ? distance : Number.MAX_SAFE_INTEGER;
    }

    private convertToPath(grid: Grid, map: Map<Node, Node>, start: Node): Path {
        const path = new Path();
        let currentNode = start;

        path.push(grid.getCoordinates(currentNode));

        while (map.get(currentNode)) {
            currentNode = map.get(currentNode);
            path.push(grid.getCoordinates(currentNode));
        }

        return path;
    }
}
