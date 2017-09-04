import * as _ from 'lodash';

import { CommitModel } from '../commit-model';
import { EmptyNode } from './nodes';
import { Node, NodeType } from './nodes';
import { Path } from './path';

export class Grid {
    private elementsCache: Node[][];
    private paths: Path[];

    constructor() {
        this.paths = [];
    }

    public get(position: Vector): Node {
        return this.elements[position.y][position.x];
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

    public findNode(position: Vector): Node {
        const node = this.elements[position.y][position.x];

        if (!node) {
            throw new Error('Node not found');
        }

        return node;
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

    public addPath(path: Path): void {
        this.paths.push(path);
        this.elementsCache = undefined;
    }

    public toString(): string {
        let str = '';

        for (let i = 0; i < this.elements.length; i++) {
            let commit: CommitModel;
            for (let j = 0; j < this.elements[i].length; j++) {
                let type: string;
                switch (this.elements[i][j].Type) {
                    case NodeType.HORIZONTAL:
                        type = '.';
                        break;
                    case NodeType.NONE:
                        type = ' ';
                        break;
                    case NodeType.VERTICAL:
                        type = '|';
                        break;
                    case NodeType.NODE:
                        commit = this.elements[i][j] as CommitModel;
                        type = 'o';
                        break;
                }
                str += type;
            }

            if (commit) {
                str += `\t${commit.message}\n`;
            } else {
                str += '\n';
            }
        }

        return str;
    }

    public get StartNode(): Node {
        return this.get({ x: 0, y: 0 });
    }

    private createRow(): Node[] {
        // TODO - dynamic width generation
        return _.times(20, () => {
            return new EmptyNode();
        });
    }

    private get elements(): Node[][] {
        if (this.elementsCache) {
            return this.elementsCache;
        }

        let elements: Node[][] = [];

        for (const path of this.paths) {
            for (const pathElement of path.createPathNodes()) {
                elements = this.padElements(elements, pathElement.position);
                elements[pathElement.position.y][pathElement.position.x] = pathElement.node;
            }
        }

        elements.push(this.createRow());

        this.elementsCache = elements;

        return elements;
    }

    private padElements(elements: Node[][], position: Vector): Node[][] {
        if (position.y > elements.length - 1) {
            const diff = position.y - (elements.length - 1);
            const rows = _.times(diff, () => this.createRow());

            return elements.concat(rows);
        }

        return elements;
    }
}
