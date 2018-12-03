import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { StartCreateBranchAction, StartPopAction, StartPushViaHttpAction, StartStashAction } from 'app/store';

@Component({
    selector: 'app-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
    constructor(private store: Store<AppState>) {}

    public ngOnInit(): void {}

    public createBranch(): void {
        this.store.dispatch(new StartCreateBranchAction('test'));
    }

    public stash(): void {
        this.store.dispatch(new StartStashAction());
    }

    public pop(): void {
        this.store.dispatch(new StartPopAction());
    }

    public push(): void {
        this.store.dispatch(new StartPushViaHttpAction('refs/remotes/origin/master', 'refs/heads/master'));
    }
}
