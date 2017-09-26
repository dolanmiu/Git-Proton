import { NodeStack } from './node-stack';

export class DistanceMap {
    private distances: Map<NodeStack, number>;

    constructor() {
        this.distances = new Map<NodeStack, number>();
    }

    public set(node: NodeStack, distance: number): void {
        this.distances.set(node, distance);
    }

    public getDistance(node: NodeStack): number {
        const distance = this.distances.get(node);

        return distance !== undefined ? distance : Number.MAX_SAFE_INTEGER;
    }
}
