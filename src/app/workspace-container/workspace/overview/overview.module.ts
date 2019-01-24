import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GitgraphAngularModule } from 'gitgraph-angular';

import { OverviewComponent } from './overview.component';
import { TableModule } from './table/table.module';

@NgModule({
    declarations: [OverviewComponent],
    imports: [CommonModule, TableModule, GitgraphAngularModule],
    exports: [OverviewComponent],
})
export class OverviewModule {}
