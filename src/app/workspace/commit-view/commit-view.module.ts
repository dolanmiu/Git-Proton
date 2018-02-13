import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from 'app/material.module';
import { CommitViewComponent } from './commit-view.component';

@NgModule({
    declarations: [CommitViewComponent],
    imports: [CommonModule, MaterialModule],
    exports: [CommitViewComponent],
})
export class CommitViewModule {}
