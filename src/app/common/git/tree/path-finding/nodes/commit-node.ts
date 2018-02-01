import { Path } from '../path';
import { Node } from './node';

export const enum NodeDirection {
    LEFT = 0,
    RIGHT = 1,
    DOWN = 2,
    UP = 3,
    NONE = 4,
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
        const neighbors = this.path.findNeighboringNodes(this);

        let previousDelta: Vector;

        if (neighbors.previous === undefined) {
            previousDelta = {
                x: this.path.PreviousDestination.x - currentPosition.x,
                y: this.path.PreviousDestination.y - currentPosition.y,
            };
        } else {
            previousDelta = {
                x: neighbors.previous.position.x - currentPosition.x,
                y: neighbors.previous.position.y - currentPosition.y,
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

    public get NextDirections(): NodeDirection[] {
        const currentPosition = this.path.getCoordinates(this);
        const output = [];

        for (const nextSource of this.path.NextSources) {
            const previousDelta = {
                x: nextSource.x - currentPosition.x,
                y: nextSource.y - currentPosition.y,
            };

            if (previousDelta.x < 0) {
                output.push(NodeDirection.LEFT);
            }

            if (previousDelta.x > 0) {
                output.push(NodeDirection.RIGHT);
            }

            if (previousDelta.y < 0) {
                output.push(NodeDirection.DOWN);
            }

            if (previousDelta.y > 0) {
                output.push(NodeDirection.UP);
            }
        }

        return output;
    }
}
