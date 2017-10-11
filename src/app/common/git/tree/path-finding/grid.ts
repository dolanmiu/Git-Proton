import * as _ from 'lodash';

import { CommitModel } from '../commit-model';
import { NodeStack } from './node-stack';
import { DataNode } from './nodes';
import { Path } from './path';

export class Grid {
    private elementsCache: NodeStack[][];
    private paths: Path<CommitModel>[];

    constructor() {
        this.paths = [];
    }

    public get(position: Vector): NodeStack {
        return this.elements[position.y][position.x];
    }

    public getCoordinates(node: NodeStack): Vector {
        for (let y = 0; y < this.elements.length; y++) {
            for (let x = 0; x < this.elements[y].length; x++) {
                if (this.elements[y][x] === node) {
                    return { x, y };
                }
            }
        }

        throw new Error('Node not found');
    }

    public findNode(position: Vector): NodeStack {
        const stack = this.elements[position.y][position.x];

        if (!stack) {
            throw new Error('Node not found');
        }

        return stack;
    }

    public checkIfNodeExists(node: NodeStack): boolean {
        for (let y = 0; y < this.elements.length; y++) {
            for (let x = 0; x < this.elements[y].length; x++) {
                if (this.elements[y][x] === node) {
                    return true;
                }
            }
        }

        return false;
    }

    public findNeighbours(node: NodeStack): NodeStack[] {
        const arr: NodeStack[] = [];
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

    public isOnTop(node: NodeStack): boolean {
        const position = this.getCoordinates(node);

        return position.y === this.elements.length - 1;
    }

    public addPath(path: Path<CommitModel>): void {
        this.paths.push(path);
        this.elementsCache = undefined;
    }

    public toString(): string {
        const strs: string[] = [];

        for (let i = 0; i < this.elements.length; i++) {
            let str = '';

            let commit: DataNode<CommitModel>;
            for (let j = 0; j < this.elements[i].length; j++) {
                if (this.elements[i][j].CommitNode) {
                    commit = this.elements[i][j].CommitNode;
                }

                str += this.elements[i][j].toString();
            }

            if (commit) {
                str += `\t${commit.commit.message}\n`;
            } else {
                str += '\n';
            }

            strs.push(str);
        }

        return strs.reverse().join('');
    }

    public findNodeFromCommit(commit: CommitModel): NodeStack {
        for (let y = 0; y < this.elements.length; y++) {
            for (let x = 0; x < this.elements[y].length; x++) {
                if (this.elements[y][x].CommitNode && this.elements[y][x].CommitNode.commit === commit) {
                    return this.elements[y][x];
                }
            }
        }

        throw new Error('Node not found');
    }

    public get StartNode(): NodeStack {
        return this.get({ x: 0, y: 0 });
    }

    private createRow(): NodeStack[] {
        // TODO - dynamic width generation
        return _.times(20, () => {
            return new NodeStack();
        });
    }

    public get elements(): NodeStack[][] {
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
