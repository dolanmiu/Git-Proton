import * as _ from 'lodash';

import { CommitModel } from '../commit-model';
import { NodeStack } from './node-stack';
import { Node, NodeType } from './nodes';
import { Path } from './path';

export class Grid {
    private elementsCache: NodeStack[][];
    private paths: Path[];

    constructor() {
        this.paths = [];
    }

    public get(position: Vector): Node {
        return this.elements[position.y][position.x].Combined;
    }

    public getCoordinates(node: Node): Vector {
        for (let y = 0; y < this.elements.length; y++) {
            for (let x = 0; x < this.elements[y].length; x++) {
                if (this.elements[y][x].Nodes.includes(node)) {
                    return { x, y };
                }
            }
        }

        throw new Error('Node not found');
    }

    public findNode(position: Vector): Node {
        const stack = this.elements[position.y][position.x];

        if (!stack) {
            throw new Error('Node not found');
        }

        return stack.Combined;
    }

    public checkIfNodeExists(node: Node): boolean {
        for (let y = 0; y < this.elements.length; y++) {
            for (let x = 0; x < this.elements[y].length; x++) {
                if (this.elements[y][x].Nodes.includes(node)) {
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
            arr.push(this.elements[position.y + 1][position.x].Combined);
        }

        if (this.elements[position.y] && this.elements[position.y][position.x + 1]) {
            arr.push(this.elements[position.y][position.x + 1].Combined);
        }

        if (this.elements[position.y] && this.elements[position.y][position.x - 1]) {
            arr.push(this.elements[position.y][position.x - 1].Combined);
        }

        return arr;
    }

    public isOnTop(node: Node): boolean {
        const position = this.getCoordinates(node);

        return position.y === this.elements.length - 1;
    }

    public addPath(path: Path): void {
        this.paths.push(path);
        this.elementsCache = undefined;
    }

    public toString(): string {
        const strs: string[] = [];

        for (let i = 0; i < this.elements.length; i++) {
            let str = '';

            let commit: CommitModel;
            for (let j = 0; j < this.elements[i].length; j++) {
                let type: string;
                switch (this.elements[i][j].Combined.Type) {
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
                        commit = this.elements[i][j].Combined as CommitModel;
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

            strs.push(str);
        }

        return strs.reverse().join('');
    }

    public get StartNode(): Node {
        return this.get({ x: 0, y: 0 });
    }

    private createRow(): NodeStack[] {
        // TODO - dynamic width generation
        return _.times(20, () => {
            return new NodeStack();
        });
    }

    private get elements(): NodeStack[][] {
        if (this.elementsCache) {
            return this.elementsCache;
        }

        let elements: NodeStack[][] = [];

        for (const path of this.paths) {
            for (const pathElement of path.Nodes) {
                elements = this.padElements(elements, pathElement.position);
                elements[pathElement.position.y][pathElement.position.x].addNode(pathElement.node);
            }
        }

        elements.push(this.createRow());

        this.elementsCache = elements;

        return elements;
    }

    private padElements(elements: NodeStack[][], position: Vector): NodeStack[][] {
        if (position.y > elements.length - 1) {
            const diff = position.y - (elements.length - 1);
            const rows = _.times(diff, () => this.createRow());

            return elements.concat(rows);
        }

        return elements;
    }
}
