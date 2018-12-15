import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getCurrentProject, StartAddRemoteAction, StartDeleteRemoteAction } from 'app/store';

@Component({
    selector: 'app-branch-view',
    templateUrl: './branch-view.component.html',
    styleUrls: ['./branch-view.component.scss'],
})
export class BranchViewComponent implements OnInit {
    public readonly references$: Observable<ReferenceData[]>;
    public readonly remotes$: Observable<RemoteData[]>;
    public readonly remoteForm: FormGroup;

    constructor(private readonly store: Store<AppState>) {
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
        this.store.dispatch(
            new StartAddRemoteAction({
                name: this.remoteForm.get('name').value,
                url: this.remoteForm.get('url').value,
            }),
        );
        this.remoteForm.reset();
    }

    public deleteRemote(name: string): void {
        this.store.dispatch(new StartDeleteRemoteAction(name));
    }
}
