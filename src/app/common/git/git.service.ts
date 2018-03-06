import { Injectable } from '@angular/core';

import { NG_CLI_ELECTRON } from './sample-data';
import { CommitModelFactoryService } from './tree/commit-model-factory.service';
import { Grid } from './tree/path-finding/grid';
import { TreeGeneratorService } from './tree/tree-generator.service';

@Injectable()
export class GitService {
    constructor(private treeBuilder: TreeGeneratorService, private modelFactory: CommitModelFactoryService) {}

    public addGitProject(directory: string): void {
        const commitModel = this.modelFactory.create(NG_CLI_ELECTRON);
        const tree = this.treeBuilder.createTree(commitModel);
        console.log(tree);
        console.log(Grid);
    }
}
