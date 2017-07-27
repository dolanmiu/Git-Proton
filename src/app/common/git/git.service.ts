import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GitService {

    constructor() { }

    public addGitProject(directory: string): Observable<{}> {

        return Observable.empty();
    }
}
