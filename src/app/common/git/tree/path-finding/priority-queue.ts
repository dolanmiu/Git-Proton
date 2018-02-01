import { NodeStack } from './node-stack';

interface WeightedNode {
    node: NodeStack;
    weight: number;
}

export class PriorityQueue {
    private array: WeightedNode[];

    constructor() {
        this.array = [];
    }

    public enQueue(item: NodeStack, weight: number): void {
        this.array.push({
            node: item,
            weight: weight,
        });

        this.array.sort((a, b) => {
            return a.weight > b.weight ? -1 : 1;
        });
    }

    public deQueue(): NodeStack {
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
