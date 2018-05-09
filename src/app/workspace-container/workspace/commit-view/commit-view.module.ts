import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { GitStagingService } from 'app/common/git/git-staging.service';
import { ProjectPathService } from 'app/common/project-path.service';
import { MaterialModule } from 'app/material.module';
import { CommitViewComponent } from './commit-view.component';
import { StagedFilesContainerComponent } from './staged-files-container/staged-files-container.component';
import { UnstagedFilesContainerComponent } from './unstaged-files-container/unstaged-files-container.component';

@NgModule({
    declarations: [CommitViewComponent, StagedFilesContainerComponent, UnstagedFilesContainerComponent],
    providers: [GitStagingService, ProjectPathService],
    imports: [CommonModule, MaterialModule, FlexLayoutModule],
    exports: [CommitViewComponent],
})
export class CommitViewModule {}
