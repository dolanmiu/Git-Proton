import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GitService } from './git.service';
import { TreeModule } from './tree/tree.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, TreeModule],
    providers: [GitService],
})
export class GitModule {}
