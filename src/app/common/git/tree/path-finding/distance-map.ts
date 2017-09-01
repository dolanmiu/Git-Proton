import { Node } from './nodes';

export class DistanceMap {
    private distances: Map<Node, number>;

    constructor() {
        this.distances = new Map<Node, number>();
    }

    public set(node: Node, distance: number): void {
        this.distances.set(node, distance);
    }

    public getDistance(node: Node): number {
        const distance = this.distances.get(node);

        return distance !== undefined ? distance : Number.MAX_SAFE_INTEGER;
    }
}
