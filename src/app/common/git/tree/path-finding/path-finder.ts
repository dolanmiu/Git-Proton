import { TreeElement } from '../tree-element';
import { Grid } from './grid';

interface PathDataCache {
    node: TreeElement;
    distance: number;
    location: Vector;
}

interface Path {
    nodes: Vector[];
}

export class PathFinder {

    public run(grid: Grid, start?: TreeElement): Path {
        const nodes: Map<PathDataCache, PathDataCache> = new Map<PathDataCache, PathDataCache>();

        if (start === undefined) {
            return { nodes: [{ x: 0, y: 0 }] };
        }

        const coordinates = grid.getCoordinates(start);

        nodes.set({
            node: start,
            distance: 0,
            location: {
                x: coordinates.x,
                y: coordinates.y,
            },
        }, undefined);

    }
}
