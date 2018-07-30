import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GitCommitService } from './git-commit.service';
import { GitDiffService } from './git-diff.service';
import { GitFetchService } from './git-fetch.service';
import { GitPushService } from './git-push.service';
import { GitReferenceService } from './git-reference.service';
import { GitRemoteService } from './git-remote.service';
import { GitSchedulerService } from './git-scheduler.service';
import { GitStashService } from './git-stash.service';
import { GitStatusService } from './git-status.service';
import { GitService } from './git.service';
import { TreeModule } from './tree/tree.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, TreeModule],
    providers: [
        GitService,
        GitStatusService,
        GitSchedulerService,
        GitReferenceService,
        GitFetchService,
        GitCommitService,
        GitDiffService,
        GitStashService,
        GitPushService,
        GitRemoteService,
    ],
})
export class GitModule {}
