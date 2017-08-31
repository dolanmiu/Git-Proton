import * as _ from 'lodash';

import { CommitModel } from '../commit-model';
import { EmptyNode } from './nodes';
import { Node, NodeType } from './nodes';
import { Path } from './path';

export class Grid {
    private elements: Node[][];

    constructor() {
        this.elements = [];
    }

    public get(x: number, y: number): Node {
        return this.elements[y][x];
    }

    public set(position: Vector, element: Node): void {
        this.elements[position.y][position.x] = element;
    }

    public getCoordinates(node: Node): Vector {
        for (let y = 0; y < this.elements.length; y++) {
            for (let x = 0; x < this.elements[y].length; x++) {
                if (node === this.elements[y][x]) {
                    return { x, y };
                }
            }
        }

        throw new Error('Node not found');
    }

    public checkIfNodeExists(node: Node): boolean {
        for (let y = 0; y < this.elements.length; y++) {
            for (let x = 0; x < this.elements[y].length; x++) {
                if (node === this.elements[y][x]) {
                    return true;
                }
            }
        }

        return false;
    }

    public findNeighbours(node: Node): Node[] {
        const arr: Node[] = [];
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

    public isOnTop(node: Node): boolean {
        const position = this.getCoordinates(node);

        return position.y === this.elements.length - 1;
    }

    public addRow(): void {
        this.elements.push(this.createRow());
    }

    public linkCommitFromPath(path: Path, commit: CommitModel): void {

    }

    public toString(): string {
        let str = '';

        for (let i = 0; i < this.elements.length; i++) {
            let commit: CommitModel;
            for (let j = 0; j < this.elements[i].length; j++) {
                let type: string;
                switch (this.elements[i][j].Type) {
                    case NodeType.LINE:
                        type = '.';
                        break;
                    case NodeType.NONE:
                        type = ' ';
                        break;
                    case NodeType.PIPE:
                        type = '|';
                        break;
                    case NodeType.NODE:
                        commit = this.elements[i][j] as CommitModel;
                        type = 'o';
                        break;
                }
                str += type;
            }
            str += `\t${commit.message}\n`;
        }

        return str;
    }

    public get StartNode(): Node {
        return this.get(0, 0);
    }

    private createRow(): Node[] {
        // TODO - dynamic width generation
        return _.times(20, () => {
            return new EmptyNode();
        });
    }
}
