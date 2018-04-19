import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GitReferenceService } from './git-reference.service';
import { GitSchedulerService } from './git-scheduler.service';
import { GitStatusService } from './git-status.service';
import { GitService } from './git.service';
import { TreeModule } from './tree/tree.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, TreeModule],
    providers: [GitService, GitStatusService, GitSchedulerService, GitReferenceService],
})
export class GitModule {}
