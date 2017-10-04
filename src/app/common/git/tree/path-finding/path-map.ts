import { Grid } from './grid';
import { NodeStack } from './node-stack';
import { Path } from './path';

export class PathMap {
    private map: Map<NodeStack, NodeStack>;

    constructor() {
        this.map = new Map<NodeStack, NodeStack>();
    }

    public set(previous: NodeStack, next: NodeStack): void {
        this.map.set(previous, next);

        this.checkForCycles();
    }

    public convertToPath<T>(grid: Grid, start: NodeStack, previousNode: NodeStack, data: T): Path<T> {
        // TODO - Add destination in constructor;
        const path: Vector[] = [];
        let currentNode = start;

        path.push(grid.getCoordinates(currentNode));

        while (this.map.get(currentNode)) {
            currentNode = this.map.get(currentNode);
            path.push(grid.getCoordinates(currentNode));
        }

        return new Path(path, grid.getCoordinates(previousNode), data);
    }

    private checkForCycles(): void {
        this.map.forEach((node, key, map) => {
            let counter = 0;
            const maxCounter = map.size;
            let currentNode = node;

            while (map.get(currentNode)) {
                if (counter > maxCounter) {
                    throw new Error('Created Cyclic Reference');
                }

                currentNode = map.get(currentNode);
                counter++;
            }
        });
    }
}
