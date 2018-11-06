import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { getCurrentProject } from 'app/store';
import { GitRemoteService } from '../../../common/git/git-remote.service';

@Component({
    selector: 'app-branch-view',
    templateUrl: './branch-view.component.html',
    styleUrls: ['./branch-view.component.scss'],
})
export class BranchViewComponent implements OnInit {
    public references$: Observable<ReferenceData[]>;
    public remotes$: Observable<RemoteData[]>;
    public remoteForm: FormGroup;

    constructor(private store: Store<AppState>, private gitRemoteService: GitRemoteService) {
        this.remotes$ = store
            .select(getCurrentProject)
            .filter((x) => !!x)
            .map((project) => project.remotes)
            .map((remotes) => [...remotes].sort((a, b) => (a.name > b.name ? 1 : -1)));

        this.remoteForm = new FormGroup({
            name: new FormControl(),
            url: new FormControl(),
        });
    }

    public ngOnInit(): void {}

    public createRemote(): void {
        console.log('doing so', this.remoteForm.get('name').value);
        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitRemoteService.createRemote(project, this.remoteForm.get('name').value, this.remoteForm.get('url').value);
            })
            .take(1)
            .subscribe();
    }

    public deleteRemote(name: string): void {
        this.store
        .select(getCurrentProject)
        .do((project) => {
            this.gitRemoteService.deleteRemote(project, name);
        })
        .take(1)
        .subscribe();
    }
}
