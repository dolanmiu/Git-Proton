import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GitStatusService } from './git-status.service';
import { GitService } from './git.service';
import { TreeModule } from './tree/tree.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, TreeModule],
    providers: [GitService, GitStatusService],
})
export class GitModule {}
