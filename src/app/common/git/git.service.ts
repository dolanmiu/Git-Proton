import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SAMPLE_DATA } from './sample-data';
import { CommitModel } from './tree/commit-model';
import { CommitModelFactoryService } from './tree/commit-model-factory.service';
import { TreeGeneratorService } from './tree/tree-generator.service';

@Injectable()
export class GitService {

    constructor(private treeBuilder: TreeGeneratorService, private modelFactory: CommitModelFactoryService) { }

    public addGitProject(directory: string): Observable<CommitModel[]> {
        const commitModel = this.modelFactory.create(SAMPLE_DATA);
        this.treeBuilder.createTree(commitModel);
        return Observable.of(commitModel);
    }
}
