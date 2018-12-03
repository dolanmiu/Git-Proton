import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';

import { GitModule } from 'app/common/git/git.module';
import { BranchViewComponent } from './branch-view.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
    declarations: [BranchViewComponent, TreeComponent],
    imports: [CommonModule, ReactiveFormsModule, TreeModule, GitModule],
    exports: [BranchViewComponent],
})
export class BranchViewModule {}
