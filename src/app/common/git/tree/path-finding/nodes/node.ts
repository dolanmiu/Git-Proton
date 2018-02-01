import { Path } from '../path';

export const enum NodeType {
    NONE = 0,
    VERTICAL = 1,
    HORIZONTAL = 2,
    NODE = 3,
    BOTTOM_RIGHT = 4,
    BOTTOM_LEFT = 5,
    TOP_RIGHT = 6,
    TOP_LEFT = 7,
}

export class Node {
    // tslint:disable-next-line:no-any
    constructor(protected path: Path<any>, private cost: number) {}

    public get Cost(): number {
        return this.cost;
    }

    public get Type(): NodeType {
        const currentPosition = this.path.getCoordinates(this);
        const neighbors = this.path.findNeighboringNodes(this);

        if (neighbors.next === undefined) {
            return NodeType.NODE;
        }

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

        const nextDelta: Vector = {
            x: neighbors.next.position.x - currentPosition.x,
            y: neighbors.next.position.y - currentPosition.y,
        };

        if (previousDelta.y === 0 && nextDelta.y === 0) {
            return NodeType.HORIZONTAL;
        }

        if (previousDelta.x === 0 && nextDelta.x === 0) {
            return NodeType.VERTICAL;
        }

        if (this.checkIfBottomLeftCorner(previousDelta, nextDelta)) {
            return NodeType.BOTTOM_LEFT;
        }

        if (this.checkIfBottomRightCorner(previousDelta, nextDelta)) {
            return NodeType.BOTTOM_RIGHT;
        }

        if (this.checkIfTopLeftCorner(previousDelta, nextDelta)) {
            return NodeType.TOP_LEFT;
        }

        if (this.checkIfTopRightCorner(previousDelta, nextDelta)) {
            return NodeType.TOP_RIGHT;
        }

        throw new Error('Cannot find node type');
    }

    private checkIfBottomLeftCorner(previous: Vector, next: Vector): boolean {
        const result = this.doubleCheck(previous, next, (p, n) => {
            if (p.x < 0 && n.y < 0) {
                return true;
            }

            return false;
        });

        return result;
    }

    private checkIfBottomRightCorner(previous: Vector, next: Vector): boolean {
        const result = this.doubleCheck(previous, next, (p, n) => {
            if (p.x > 0 && n.y < 0) {
                return true;
            }

            return false;
        });

        return result;
    }

    private checkIfTopLeftCorner(previous: Vector, next: Vector): boolean {
        const result = this.doubleCheck(previous, next, (p, n) => {
            if (p.x < 0 && n.y > 0) {
                return true;
            }

            return false;
        });

        return result;
    }

    private checkIfTopRightCorner(previous: Vector, next: Vector): boolean {
        const result = this.doubleCheck(previous, next, (p, n) => {
            if (p.x > 0 && n.y > 0) {
                return true;
            }

            return false;
        });

        return result;
    }

    private doubleCheck(previous: Vector, next: Vector, checkFunc: (x: Vector, y: Vector) => boolean): boolean {
        const firstResult = checkFunc(previous, next);
        const secondResult = checkFunc(next, previous);

        if (firstResult || secondResult) {
            return true;
        }

        return false;
    }
}
