import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITreeOptions, TREE_ACTIONS, TreeNode } from 'angular-tree-component';
import { Observable } from 'rxjs/Observable';

import { getCurrentProject } from 'app/store';
import { GitReferenceService } from '../../../../common/git/git-reference.service';

interface NodeData {
    id: number;
    name: string;
    children: NodeData[];
    reference: ReferenceData;
}

@Component({
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
})
export class TreeComponent {
    public nodes$: Observable<NodeData[]>;
    public options: ITreeOptions = {
        actionMapping: {
            mouse: {
                dblClick: (tree, node: TreeNode, $event) => {
                    const data = node.data as ReferenceData;

                    if (node.hasChildren) {
                        TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
                    } else {
                        console.log(data.name);
                        this.checkoutBranch(data.name);
                    }
                },
            },
        },
    };

    constructor(private store: Store<AppState>, private gitReferenceService: GitReferenceService) {
        this.nodes$ = store
            .select(getCurrentProject)
            .filter((x) => !!x)
            .map((project) => {
                return project.references;
            })
            .map((references) => {
                return references.sort();
            })
            .map((references) => {
                return references.map((reference) => {
                    return {
                        ...reference,
                        name: reference.name.replace('refs/', ''),
                    } as ReferenceData;
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
            reference: undefined,
        };

        for (const path of paths) {
            let position = parsed;
            const split = path.name.split('/');

            for (const pathToken of split) {
                if (pathToken === '') {
                    continue;
                }

                if (!this.checkIfExistsInSubTree(position, pathToken)) {
                    position.children.push({
                        id: ++currentId,
                        name: pathToken,
                        children: [],
                        reference: path,
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

    private checkoutBranch(reference: string): void {
        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitReferenceService.checkoutBranch(project, reference);
            })
            .take(1)
            .subscribe();
    }
}
