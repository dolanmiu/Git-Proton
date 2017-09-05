
import { Node } from './nodes';

interface WeightedNode {
    node: Node;
    weight: number;
}

export class PriorityQueue {
    private array: WeightedNode[];

    constructor() {
        this.array = [];
    }

    public enQueue(item: Node, weight: number): void {
        this.array.push({
            node: item,
            weight: weight,
        });

        this.array.sort((a, b) => {
            return a.weight > b.weight ? -1 : 1;
        });
    }

    public deQueue(): Node {
        const weightedNode = this.array.pop();

        if (!weightedNode) {
            throw new Error('Cannot de-queue empty queue');
        }

        return weightedNode.node;
    }

    public get HasItems(): boolean {
        return this.array.length !== 0;
    }
}