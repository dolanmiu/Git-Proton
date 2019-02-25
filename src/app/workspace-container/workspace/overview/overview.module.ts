import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GraphModule } from './graph/graph.module';
import { OverviewComponent } from './overview.component';
import { TableModule } from './table/table.module';

@NgModule({
    declarations: [OverviewComponent],
    imports: [CommonModule, TableModule, GraphModule],
    exports: [OverviewComponent],
})
export class OverviewModule {}
