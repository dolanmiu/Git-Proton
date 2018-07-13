import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';

import { MaterialModule } from 'app/material.module';
import { BranchViewComponent } from './branch-view.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
    declarations: [BranchViewComponent, TreeComponent],
    imports: [CommonModule, MaterialModule, TreeModule],
    exports: [BranchViewComponent],
})
export class BranchViewModule {}
