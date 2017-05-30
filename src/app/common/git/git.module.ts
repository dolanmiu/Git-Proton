import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GitService } from './git.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ],
    providers: [
        GitService,
    ],
})
export class GitModule { }
