import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { GitStagingService } from 'app/common/git/git-staging.service';
import { GitModule } from 'app/common/git/git.module';
import { ProjectPathService } from 'app/common/project-path.service';
import { MaterialModule } from 'app/material.module';
import { CommitViewComponent } from './commit-view.component';
import { StagedFilesContainerComponent } from './staged-files-container/staged-files-container.component';
import { UnstagedFilesContainerComponent } from './unstaged-files-container/unstaged-files-container.component';

@NgModule({
    declarations: [CommitViewComponent, StagedFilesContainerComponent, UnstagedFilesContainerComponent],
    providers: [GitStagingService, ProjectPathService],
    imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, GitModule],
    exports: [CommitViewComponent],
})
export class CommitViewModule {}
