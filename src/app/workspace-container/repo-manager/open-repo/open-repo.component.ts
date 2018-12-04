import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { DialogService } from 'app/common/electron/dialog.service';
import { GitService } from 'app/git/git.service';
import { AddProjectAction } from 'app/store';

@Component({
    selector: 'app-open-repo',
    templateUrl: './open-repo.component.html',
    styleUrls: ['./open-repo.component.scss'],
})
export class OpenRepoComponent implements OnInit {
    constructor(private dialogService: DialogService, private gitService: GitService, private store: Store<AppState>) {}

    public ngOnInit(): void {}

    public openDialog(): void {
        this.dialogService.openDialog((folderDetails) => {
            this.store.dispatch(new AddProjectAction(folderDetails.name, folderDetails.path));
            this.gitService.getCommits(folderDetails.path);
        });
    }
}
