import { Component, Input } from '@angular/core';

import { GitStagingService } from '../../../../common/git/git-staging.service';

@Component({
    selector: 'app-unstaged-files-container',
    templateUrl: './unstaged-files-container.component.html',
    styleUrls: ['./unstaged-files-container.component.scss'],
})
export class UnstagedFilesContainerComponent {
    @Input() public files: StatusData[];

    constructor(private gitStagingService: GitStagingService) {}

    public stageFile(): void {
        this.gitStagingService.stage('');
    }
}
