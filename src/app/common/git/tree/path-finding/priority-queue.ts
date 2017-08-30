
import { TreeElement } from './tree-element';

interface WeightedNode {
    node: TreeElement;
    weight: number;
}

export class PriorityQueue {
    private array: WeightedNode[];

    constructor() {
        this.array = [];
    }

    public enQueue(item: TreeElement, weight: number): void {
        this.array.push({
            node: item,
            weight: weight,
        });

        this.array.sort((a, b) => {
            return a.weight > b.weight ? -1 : 1;
        });
    }

    public deQueue(): TreeElement {
        return this.array.pop().node;
    }

    public get HasItems(): boolean {
        return this.array.length !== 0;
    }
}
