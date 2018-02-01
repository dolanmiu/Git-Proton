import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';

import { CommitViewComponent } from './commit-view.component';

@NgModule({
    declarations: [CommitViewComponent],
    imports: [CommonModule, MatListModule, MatIconModule, MatInputModule, MatButtonModule],
    exports: [CommitViewComponent],
})
export class CommitViewModule {}
