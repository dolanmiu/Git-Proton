import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SAMPLE_DATA } from './sample-data';
import { TreeGeneratorService } from './tree-generator.service';

@Injectable()
export class GitService {

    constructor(private treeBuilder: TreeGeneratorService) { }

    public addGitProject(directory: string): Observable<CommitModel[]> {
        this.treeBuilder.createTree(SAMPLE_DATA);
        return Observable.of(SAMPLE_DATA);
    }
}
