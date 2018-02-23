import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'app/material.module';
import { CommitViewComponent } from './commit-view.component';
import { FileSelectComponent } from './file-select/file-select.component';

@NgModule({
    declarations: [CommitViewComponent, FileSelectComponent],
    imports: [CommonModule, MaterialModule, FlexLayoutModule],
    exports: [CommitViewComponent],
})
export class CommitViewModule {}
