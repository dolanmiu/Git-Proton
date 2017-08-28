import * as _ from 'lodash';

import { EmptyNode } from './empty-node';
import { TreeElement } from './tree-element';

export class Grid {
    private elements: TreeElement[][];

    constructor() {
        this.elements = [];
    }

    public get(x: number, y: number): TreeElement {
        if (x > this.elements.length - 1) {
            const diff = x - this.elements.length;
            const rows = _.times(diff, _.constant(this.createRow()));

            this.elements.concat(rows);
        }

        return this.elements[y][x];
    }

    public set(x: number, y: number, element: TreeElement): void {

    }

    public getCoordinates(node: TreeElement): Vector {
        for (let i = 0; i < this.elements.length; i++) {
            for (let j = 0; j < this.elements[i].length; j++) {
                if (node === this.elements[i][j]) {
                    return {
                        x: i,
                        y: j,
                    };
                }
            }
        }

        throw new Error('Node not found');
    }

    public findNeighbours(node: TreeElement): TreeElement[] {
        const arr: TreeElement[] = [];
        const position = this.getCoordinates(node);

        if (this.elements[position.y + 1] && this.elements[position.y + 1][position.x]) {
            arr.push(this.elements[position.y + 1][position.x]);
        }

        if (this.elements[position.y - 1] && this.elements[position.y - 1][position.x]) {
            arr.push(this.elements[position.y + 1][position.x]);
        }

        if (this.elements[position.y] && this.elements[position.y][position.x + 1]) {
            arr.push(this.elements[position.y + 1][position.x]);
        }

        if (this.elements[position.y] && this.elements[position.y][position.x - 1]) {
            arr.push(this.elements[position.y + 1][position.x]);
        }

        return arr;
    }

    private createRow(): TreeElement[] {
        // TODO - dynamic width generation
        return _.times(20, _.constant(new EmptyNode));
    }
}
