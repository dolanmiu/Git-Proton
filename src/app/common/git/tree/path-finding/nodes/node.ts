import { Path } from '../path';

export const enum NodeType {
    NONE, VERTICAL, HORIZONTAL, NODE,
}

export class Node {
    constructor(protected path: Path, private cost: number) {
    }

    public get Cost(): number {
        return this.cost;
    }

    public get Type(): NodeType {
        const currentPosition = this.path.getCoordinates(this);
        const neighbours = this.path.findNeighbouringNodes(this);

        if (neighbours.next === undefined) {
            return NodeType.NODE;
        }

        if (neighbours.previous === undefined) {
            // Need fixing
            return NodeType.VERTICAL;
        }

        const previousXDelta = neighbours.previous.position.x - currentPosition.x;
        const nextXDelta = neighbours.next.position.x - currentPosition.x;
        const previousYDelta = neighbours.previous.position.y - currentPosition.y;
        const nextYDelta = neighbours.next.position.y - currentPosition.y;

        if (Math.abs(previousXDelta) && Math.abs(nextXDelta)) {
            return NodeType.HORIZONTAL;
        } else if (Math.abs(previousYDelta) && Math.abs(nextYDelta)) {
            return NodeType.VERTICAL;
        } else {
            return NodeType.HORIZONTAL;
        }
    }
}
