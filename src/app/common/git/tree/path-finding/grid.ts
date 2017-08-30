import * as _ from 'lodash';

import { EmptyNode } from './empty-node';
import { TreeElement, TreeElementType } from './tree-element';

export class Grid {
    private elements: TreeElement[][];

    constructor() {
        this.elements = [];
    }

    public get(x: number, y: number): TreeElement {
        return this.elements[y][x];
    }

    public set(x: number, y: number, element: TreeElement): void {
        this.elements[y][x] = element;
    }

    public getCoordinates(node: TreeElement): Vector {
        for (let i = 0; i < this.elements.length; i++) {
            for (let j = 0; j < this.elements[i].length; j++) {
                if (node === this.elements[i][j]) {
                    return {
                        x: j,
                        y: i,
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

        if (this.elements[position.y] && this.elements[position.y][position.x + 1]) {
            arr.push(this.elements[position.y][position.x + 1]);
        }

        if (this.elements[position.y] && this.elements[position.y][position.x - 1]) {
            arr.push(this.elements[position.y][position.x - 1]);
        }

        return arr;
    }

    public isOnTop(node: TreeElement): boolean {
        const position = this.getCoordinates(node);

        return position.y === this.elements.length - 1;
    }

    public addRow(): void {
        this.elements.push(this.createRow());
    }

    public toString(): string {
        let str = '';

        for (let i = 0; i < this.elements.length; i++) {
            for (let j = 0; j < this.elements[i].length; j++) {
                let type: string;
                switch (this.elements[i][j].Type) {
                    case TreeElementType.LINE:
                        type = '.';
                        break;
                    case TreeElementType.NONE:
                        type = ' ';
                        break;
                    case TreeElementType.PIPE:
                        type = '|';
                        break;
                    case TreeElementType.NODE:
                        type = 'o';
                        break;
                }
                str += type;
            }
            str += '\n';
        }

        return str;
    }

    public get StartNode(): TreeElement {
        return this.get(0, 0);
    }

    private createRow(): TreeElement[] {
        // TODO - dynamic width generation
        return _.times(20, () => {
            return new EmptyNode();
        });
    }
}
