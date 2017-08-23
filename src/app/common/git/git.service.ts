import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SAMPLE_DATA } from './sample-data';

@Injectable()
export class GitService {

    constructor() { }

    public addGitProject(directory: string): Observable<CommitModel[]> {

        return Observable.of(SAMPLE_DATA);
    }
}
