import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';

import { BranchViewComponent } from './branch-view.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
    declarations: [BranchViewComponent, TreeComponent],
    imports: [CommonModule, TreeModule],
    exports: [BranchViewComponent],
})
export class BranchViewModule {}
