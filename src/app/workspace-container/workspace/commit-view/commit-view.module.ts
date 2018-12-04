import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommitViewComponent } from './commit-view.component';
import { StagedFilesContainerComponent } from './staged-files-container/staged-files-container.component';
import { UnstagedFilesContainerComponent } from './unstaged-files-container/unstaged-files-container.component';

@NgModule({
    declarations: [CommitViewComponent, StagedFilesContainerComponent, UnstagedFilesContainerComponent],
    imports: [CommonModule, FormsModule],
    exports: [CommitViewComponent],
})
export class CommitViewModule {}
