import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BranchViewComponent } from './branch-view.component';

@NgModule({
    declarations: [BranchViewComponent],
    imports: [CommonModule],
    exports: [BranchViewComponent],
})
export class BranchViewModule {}
