import { Grid } from './grid';
import { PathDataCache } from './path-data-cache';
import { SortedArray } from './sorted-array';
import { TreeElement, TreeElementType } from './tree-element';

interface Path {
    nodes: Vector[];
}

export class PathFinder {

    public run(grid: Grid, start?: TreeElement): Path {
        const path: Map<PathDataCache, PathDataCache> = new Map<PathDataCache, PathDataCache>();

        const openList = new SortedArray();
        const closedList: PathDataCache[] = [];
        openList.push({
            node: start,
            distance: 0,
        });

        path.set({
            node: start,
            distance: 0,
        }, undefined);

        const currentNode = openList.pop();
        this.pass(grid, path, openList, closedList, currentNode);

        return undefined;
    }

    // tslint:disable-next-line:max-line-length
    private pass(grid: Grid, path: Map<PathDataCache, PathDataCache>, openList: PathDataCache[], closedList: PathDataCache[], currentNode: PathDataCache): void {
        if (grid.isOnTop(currentNode.node)) {
            return;
        }

        const neighbours = grid.findNeighbours(currentNode.node);

        for (const node of neighbours) {
            if (node.Type === TreeElementType.PIPE) {
                continue;
            }

            if (currentNode.distance + 1 > this.getDistance(openList, closedList, node)) {
                continue;
            }

            const cache = {
                node: node,
                distance: currentNode.distance + 1,
            };

            openList.push(cache);
            path.set(currentNode, cache);
        }

        closedList.push(currentNode);

        for (let i = 0; i < openList.length; i++) {
            const nextCurrentNode = openList.pop();
            this.pass(grid, path, openList, closedList, nextCurrentNode);
        }
    }

    private getDistance(openList: PathDataCache[], closedList: PathDataCache[], node: TreeElement): number {
        for (const data of openList) {
            if (data.node === node) {
                return data.distance;
            }
        }

        for (const data of openList) {
            if (data.node === node) {
                return data.distance;
            }
        }

        return Number.MAX_SAFE_INTEGER;
    }

    // private convertToPath(map: Map<PathDataCache, PathDataCache>, ): Path {
    // }
}
