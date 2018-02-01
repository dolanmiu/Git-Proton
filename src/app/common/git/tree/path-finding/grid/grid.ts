import { CommitModel } from '../../commit-model';
import { NodeStack } from '../node-stack';
import { DataNode } from '../nodes';
import { Path } from '../path';
import { GridRenderer } from './grid-renderer';

export class Grid {
    private elementsCache: NodeStack[][];
    private paths: Path<CommitModel>[];
    private renderer: GridRenderer<CommitModel>;

    constructor() {
        this.renderer = new GridRenderer();
        this.paths = [];
    }

    public get(position: Vector): NodeStack {
        const stack = this.Elements[position.y][position.x];

        if (!stack) {
            throw new Error('Node not found');
        }

        return stack;
    }

    public getCoordinates(node: NodeStack): Vector {
        for (let y = 0; y < this.Elements.length; y++) {
            for (let x = 0; x < this.Elements[y].length; x++) {
                if (this.Elements[y][x] === node) {
                    return { x, y };
                }
            }
        }

        throw new Error('Node not found');
    }

    public checkIfNodeExists(node: NodeStack): boolean {
        for (let y = 0; y < this.Elements.length; y++) {
            for (let x = 0; x < this.Elements[y].length; x++) {
                if (this.Elements[y][x] === node) {
                    return true;
                }
            }
        }

        return false;
    }

    public findNeighbors(node: NodeStack): NodeStack[] {
        const arr: NodeStack[] = [];
        const position = this.getCoordinates(node);

        if (this.Elements[position.y + 1] && this.Elements[position.y + 1][position.x]) {
            arr.push(this.Elements[position.y + 1][position.x]);
        }

        if (this.Elements[position.y] && this.Elements[position.y][position.x + 1]) {
            arr.push(this.Elements[position.y][position.x + 1]);
        }

        if (this.Elements[position.y] && this.Elements[position.y][position.x - 1]) {
            arr.push(this.Elements[position.y][position.x - 1]);
        }

        return arr;
    }

    public isOnTop(node: NodeStack): boolean {
        const position = this.getCoordinates(node);

        return position.y === this.Elements.length - 1;
    }

    public addPath(path: Path<CommitModel>): void {
        this.paths.push(path);
        this.elementsCache = undefined;
    }

    public toString(): string {
        const stringArray: string[] = [];

        for (let i = 0; i < this.Elements.length; i++) {
            let str = '';

            let commit: DataNode<CommitModel>;
            for (let j = 0; j < this.Elements[i].length; j++) {
                if (this.Elements[i][j].CommitNode) {
                    commit = this.Elements[i][j].CommitNode;
                }

                str += this.Elements[i][j].toString();
            }

            if (commit) {
                str += `\t${commit.commit.message}\n`;
            } else {
                str += '\n';
            }

            stringArray.push(str);
        }

        return stringArray.reverse().join('');
    }

    public findNodeFromCommit(commit: CommitModel): NodeStack {
        for (let y = 0; y < this.Elements.length; y++) {
            for (let x = 0; x < this.Elements[y].length; x++) {
                if (this.Elements[y][x].CommitNode && this.Elements[y][x].CommitNode.commit === commit) {
                    return this.Elements[y][x];
                }
            }
        }

        throw new Error('Node not found');
    }

    public get StartNode(): NodeStack {
        return this.get({ x: 0, y: 0 });
    }

    public get Elements(): NodeStack[][] {
        if (this.elementsCache) {
            return this.elementsCache;
        }

        this.elementsCache = this.renderer.render(this.paths);

        return this.elementsCache;
    }
}
