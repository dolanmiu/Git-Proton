import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { GitStagingService } from 'app/common/git/git-staging.service';
import { getCurrentProject } from 'app/store';

@Component({
    selector: 'app-staged-files-container',
    templateUrl: './staged-files-container.component.html',
    styleUrls: ['./staged-files-container.component.scss'],
})
export class StagedFilesContainerComponent {
    @Input() public files: StatusData[];

    constructor(private store: Store<AppState>, private gitStagingService: GitStagingService) {}

    public unstageFile(file: StatusData): void {
        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitStagingService.unstage(project, [file.newFile.path]);
            })
            .take(1)
            .subscribe();
    }
}
