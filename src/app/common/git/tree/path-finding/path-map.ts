import { Grid } from './grid';
import { Node } from './nodes';
import { Path } from './path';

export class PathMap {
    private map: Map<Node, Node>;

    constructor() {
        this.map = new Map<Node, Node>();
    }

    public set(previous: Node, next: Node): void {
        this.map.set(previous, next);
    }

    public convertToPath(grid: Grid, start: Node): Path {
        // TODO - Add destination in constructor;
        const path = [];
        let currentNode = start;

        path.push(grid.getCoordinates(currentNode));

        while (this.map.get(currentNode)) {
            currentNode = this.map.get(currentNode);
            path.push(grid.getCoordinates(currentNode));
        }

        return new Path(path);
    }
}
