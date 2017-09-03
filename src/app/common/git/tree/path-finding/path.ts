import * as _ from 'lodash';

import { HorizontalNode, VerticalNode } from './nodes';
import { Node } from './nodes';

interface PathNode {
    position: Vector;
    node: Node;
}
export class Path {
    private positions: Vector[];
    private destination: Node;

    constructor() {
        this.positions = [];
    }

    public push(position: Vector): void {
        this.positions.push(position);
    }

    public createPathNodes(): PathNode[] {
        if (!this.destination) {
            throw new Error('There is no destination for the path');
        }

        const positions = _.cloneDeep(this.positions);
        const array: PathNode[] = [];

        positions.reverse();

        for (let i = 0; i < positions.length; i++) {
            if (positions.length > 1 && i === 0) {
                continue;
            }
            array.push({
                position: positions[i],
                node: this.createNode(i, this.destination),
            });
        }

        return array;
    }

    public get EndPosition(): Vector {
        return this.positions[0];
    }

    public set Destination(node: Node) {
        this.destination = node;
    }

    private createNode(index: number, commit: Node): Node {
        const currentPosition = this.positions[index];
        const nextPosition = this.positions[index + 1];
        const previousPosition = this.positions[index - 1];

        if (nextPosition === undefined) {
            return commit;
        }

        if (previousPosition === undefined) {
            // Need fixing
            return new VerticalNode();
        }

        const previousXDelta = previousPosition.x - currentPosition.x;
        const nextXDelta = nextPosition.x - currentPosition.x;
        const previousYDelta = previousPosition.y - currentPosition.y;
        const nextYDelta = nextPosition.y - currentPosition.y;

        if (Math.abs(previousXDelta) && Math.abs(nextXDelta)) {
            return new HorizontalNode();
        } else if (Math.abs(previousYDelta) && Math.abs(nextYDelta)) {
            return new VerticalNode();
        } else {
            return new HorizontalNode();
        }
    }

}
