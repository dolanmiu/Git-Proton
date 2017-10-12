import * as _ from 'lodash';

import { DataNode, EdgeNode, Node } from './nodes';

interface PathNode {
    position: Vector;
    node: Node;
}

export class Path<T> {
    private nodes: PathNode[];
    private nextSources: Vector[];

    constructor(private positions: Vector[], private previousDestination: Vector, private data: T) {
        this.nodes = this.createPathNodes();
        this.nextSources = [];
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

    public addNextSource(vector: Vector): void {
        this.nextSources.push(vector);
    }

    private createPathNodes(): PathNode[] {
        const positions = _.cloneDeep(this.positions);
        const array: PathNode[] = [];

        positions.reverse();

        for (let i = 0; i < positions.length; i++) {
            if (positions.length > 1 && i === 0) {
                continue;
            }
            array.push({
                position: positions[i],
                node: this.positions[i + 1] === undefined ? new DataNode(this, this.data) : new EdgeNode(this),
            });
        }

        return array;
    }

    public get EndPosition(): Vector {
        return this.positions[0];
    }

    public get PreviousDestination(): Vector {
        return this.previousDestination;
    }

    public get Nodes(): PathNode[] {
        return this.nodes;
    }

    public get NextSources(): Vector[] {
        return this.nextSources;
    }

    public get Destination(): Vector {
        return this.nodes[this.nodes.length - 1].position;
    }
}
