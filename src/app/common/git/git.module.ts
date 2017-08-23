import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GitService } from './git.service';
import { TreeGeneratorService } from './tree-generator.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ],
    providers: [
        GitService,
        TreeGeneratorService,
    ],
})
export class GitModule { }
