import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { getCurrentProject } from 'app/store';

interface NodeData {
    id: number;
    name: string;
    children: NodeData[];
}

@Component({
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
})
export class TreeComponent {
    public nodes$: Observable<NodeData[]>;
    public options = {};

    constructor(store: Store<AppState>) {
        this.nodes$ = store
            .select(getCurrentProject)
            .map((project) => {
                if (!project) {
                    return [];
                }
                return project.references;
            })
            .map((references) => {
                return references.map((reference) => {
                    return {
                        ...reference,
                        reference: reference.reference.replace('refs/', ''),
                    };
                });
            })
            .map((references) => {
                return this.createTree(references).children;
            });
    }

    private createTree(paths: ReferenceData[]): NodeData {
        // https://stackoverflow.com/questions/36248245/how-to-convert-an-array-of-paths-into-json-structure

        let currentId = 0;
        const parsed: NodeData = {
            id: currentId,
            name: 'root',
            children: [],
        };

        for (const path of paths) {
            let position = parsed;
            const split = path.reference.split('/');

            for (const pathToken of split) {
                if (pathToken === '') {
                    continue;
                }

                if (!this.checkIfExistsInSubTree(position, pathToken)) {
                    position.children.push({
                        id: ++currentId,
                        name: pathToken,
                        children: [],
                    });
                }

                position = this.getInPathTree(position, pathToken);
            }
        }
        return parsed;
    }

    private checkIfExistsInSubTree(subtree: NodeData, key: string): boolean {
        for (const child of subtree.children) {
            if (child.name === key) {
                return true;
            }
        }

        return false;
    }

    private getInPathTree(subtree: NodeData, key: string): NodeData {
        for (const child of subtree.children) {
            if (child.name === key) {
                return child;
            }
        }

        throw Error(`${key} is not found`);
    }
}
