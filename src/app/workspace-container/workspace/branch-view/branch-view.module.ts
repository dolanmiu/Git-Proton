import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from 'app/material.module';
import { BranchViewComponent } from './branch-view.component';

@NgModule({
    declarations: [BranchViewComponent],
    imports: [CommonModule, MaterialModule],
    exports: [BranchViewComponent],
})
export class BranchViewModule {}
