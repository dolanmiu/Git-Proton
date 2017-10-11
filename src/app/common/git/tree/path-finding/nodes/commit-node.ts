import { Path } from '../path';
import { Node } from './node';

export const enum NodeDirection {
    LEFT = 0, RIGHT = 1, DOWN = 2, UP = 3, NONE = 4,
}

export class DataNode<T> extends Node {

    constructor(path: Path<T>, public readonly commit: T) {

        super(path, 1);
        if (!commit) {
            throw new Error('Data needs to be defined');
        }
    }

    public toString(): string {
        return 'o';
    }

    public get Direction(): NodeDirection {
        const currentPosition = this.path.getCoordinates(this);
        const neighbours = this.path.findNeighbouringNodes(this);

        let previousDelta: Vector;

        if (neighbours.previous === undefined) {
            previousDelta = {
                x: this.path.PreviousDestination.x - currentPosition.x,
                y: this.path.PreviousDestination.y - currentPosition.y,
            };
        } else {
            previousDelta = {
                x: neighbours.previous.position.x - currentPosition.x,
                y: neighbours.previous.position.y - currentPosition.y,
            };
        }

        if (previousDelta.x < 0) {
            return NodeDirection.LEFT;
        }

        if (previousDelta.x > 0) {
            return NodeDirection.RIGHT;
        }

        if (previousDelta.y < 0) {
            return NodeDirection.DOWN;
        }

        return NodeDirection.NONE;
    }

    public get NextDirection(): NodeDirection {
        const currentPosition = this.path.getCoordinates(this);

        if (!this.path.NextSource) {
            return NodeDirection.NONE;
        }

        const previousDelta = {
            x: this.path.NextSource.x - currentPosition.x,
            y: this.path.NextSource.y - currentPosition.y,
        };

        if (previousDelta.x < 0) {
            return NodeDirection.LEFT;
        }

        if (previousDelta.x > 0) {
            return NodeDirection.RIGHT;
        }

        if (previousDelta.y < 0) {
            return NodeDirection.DOWN;
        }

        if (previousDelta.y > 0) {
            return NodeDirection.UP;
        }

        return NodeDirection.NONE;
        // throw new Error('Error in direction of Node');
    }
}
