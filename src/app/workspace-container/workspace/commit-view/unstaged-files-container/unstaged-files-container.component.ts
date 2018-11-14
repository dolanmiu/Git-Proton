import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { GitStagingService } from 'app/common/git/git-staging.service';
import { getCurrentProject } from 'app/store';

@Component({
    selector: 'app-unstaged-files-container',
    templateUrl: './unstaged-files-container.component.html',
    styleUrls: ['./unstaged-files-container.component.scss'],
})
export class UnstagedFilesContainerComponent {
    @Input() public readonly files: StatusData[];

    constructor(private store: Store<AppState>, private gitStagingService: GitStagingService) {}

    public stageFile(file: StatusData): void {
        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitStagingService.stage(project, [file.newFile.path]);
            })
            .take(1)
            .subscribe();
    }
}
