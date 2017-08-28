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

        const coordinates = grid.getCoordinates(start);

        path.set({
            node: start,
            distance: 0,
        }, undefined);

    }

    private pass(grid: Grid, path: Map<PathDataCache, PathDataCache>, openList: PathDataCache[], closedList: PathDataCache[]): void {
        const currentNode = openList.pop();
        const neighbours = grid.findNeighbours(currentNode.node);

        for (const node of neighbours) {
            if (node.Type === TreeElementType.PIPE) {
                continue;
            }

            openList.push({
                node: node,
                distance: currentNode.distance + 1,
            });
        }

        closedList.push(currentNode);
    }
}
