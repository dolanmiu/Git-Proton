import { TreeElement } from '../tree-element';

export class Grid {
    private elements: TreeElement[][];

    public get(x: number, y: number): TreeElement {
        return this.elements[x][y];
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
}
