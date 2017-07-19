import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdIconModule, MdInputModule, MdListModule } from '@angular/material';

import { CommitViewComponent } from './commit-view.component';

@NgModule({
    declarations: [
        CommitViewComponent,
    ],
    imports: [
        CommonModule,
        MdListModule,
        MdIconModule,
        MdInputModule,
        MdButtonModule,
    ],
    exports: [
        CommitViewComponent,
    ],
})
export class CommitViewModule { }
