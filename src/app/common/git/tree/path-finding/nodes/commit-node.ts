import { Path } from '../path';
import { Node } from './node';

export const enum NodeDirection {
    NODE_HORIZONTAL = 1, NODE_VERTICAL = 2, NODE_LEFT = 3, NODE_RIGHT = 4, NODE_BOTTOM = 5,
}

export class DataNode<T> extends Node {

    constructor(path: Path<T>, public readonly commit: T) {
        super(path, 1);
    }

    public toString(): string {
        return 'o';
    }

    public get Direction(): NodeDirection {
        // const currentPosition = this.path.getCoordinates(this);
        const neighbours = this.path.findNeighbouringNodes(this);

        if (neighbours.next === undefined) {
            return NodeDirection.NODE_VERTICAL;
        }

        // let previousDelta: Vector;

        // if (neighbours.previous === undefined) {
        //     previousDelta = {
        //         x: this.path.PreviousDestination.x - currentPosition.x,
        //         y: this.path.PreviousDestination.y - currentPosition.y,
        //     };
        // } else {
        //     previousDelta = {
        //         x: neighbours.previous.position.x - currentPosition.x,
        //         y: neighbours.previous.position.y - currentPosition.y,
        //     };
        // }

        // const nextDelta: Vector = {
        //     x: neighbours.next.position.x - currentPosition.x,
        //     y: neighbours.next.position.y - currentPosition.y,
        // };
    }
}
