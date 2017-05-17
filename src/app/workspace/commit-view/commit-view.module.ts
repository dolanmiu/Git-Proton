import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommitViewComponent } from './commit-view.component';

@NgModule({
    declarations: [
        CommitViewComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CommitViewComponent,
    ],
})
export class CommitViewModule { }
