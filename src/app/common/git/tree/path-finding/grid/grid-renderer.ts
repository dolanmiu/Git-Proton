import * as _ from 'lodash';

import { NodeStack } from '../node-stack';
import { Path } from '../path';

export class GridRenderer<T> {

    public render(paths: Path<T>[]): NodeStack[][] {
        let elements: NodeStack[][] = [];

        for (const path of paths) {
            for (const pathElement of path.Nodes) {
                elements = this.padElements(elements, pathElement.position);
                elements[pathElement.position.y][pathElement.position.x].addNode(pathElement.node);
            }
        }

        elements.push(this.createRow());

        this.patchPaths(paths);

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

    private createRow(): NodeStack[] {
        // TODO - dynamic width generation
        return _.times(20, () => {
            return new NodeStack();
        });
    }

    private patchPaths(paths: Path<T>[]): void {
        for (const path of paths) {
            const destination = path.Destination;
            for (const potentialNextPath of paths) {
                if (potentialNextPath === path) {
                    continue;
                }

                if (potentialNextPath.PreviousDestination.x === destination.x
                    && potentialNextPath.PreviousDestination.y === destination.y) {
                    path.addNextSource(potentialNextPath.Nodes[0].position);
                    // break;
                }
            }
            console.log(path.NextSources);
        }
    }
}
