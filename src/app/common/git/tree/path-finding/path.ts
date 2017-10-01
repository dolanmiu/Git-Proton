import * as _ from 'lodash';

import { CommitModel } from '../commit-model';
import { DataNode, EdgeNode, Node } from './nodes';

interface PathNode {
    position: Vector;
    node: Node;
}

export class Path {
    private destination: Node;
    private nodes: PathNode[];
    private previousDestination: Vector;

    constructor(private positions: Vector[]) {
    }

    public findNeighbouringNodes(node: Node): { previous: PathNode, next: PathNode } {
        const index = _.findIndex(this.nodes, (o) => { return o.node === node; });

        if (index === -1) {
            throw new Error('Node is not in path');
        }

        return {
            previous: this.nodes[index - 1],
            next: this.nodes[index + 1],
        };
    }

    public getCoordinates(node: Node): Vector {
        const pathNode = this.nodes.find((n) => n.node === node);

        if (!pathNode) {
            throw new Error('Node is not in path');
        }

        return pathNode.position;
    }

    private createPathNodes(): PathNode[] {
        if (!this.destination) {
            throw new Error('There is no destination for the path');
        }

        const positions = _.cloneDeep(this.positions);
        const array: PathNode[] = [];

        positions.reverse();

        for (let i = 0; i < positions.length; i++) {
            if (positions.length > 1 && i === 0) {
                continue;
            }
            array.push({
                position: positions[i],
                node: this.positions[i + 1] === undefined ? this.destination : new EdgeNode(this),
            });
        }

        return array;
    }

    public get EndPosition(): Vector {
        return this.positions[0];
    }

    public set Destination(commit: CommitModel) {
        this.destination = new DataNode(this, commit);
        this.nodes = this.createPathNodes();
    }

    public get PreviousDestination(): Vector {
        return this.previousDestination;
    }

    public set PreviousDestination(position: Vector) {
        this.previousDestination = position;
    }

    public get Nodes(): PathNode[] {
        return this.nodes;
    }
}
