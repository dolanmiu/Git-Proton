import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OverviewComponent } from './overview.component';
import { TableModule } from './table/table.module';

@NgModule({
    declarations: [OverviewComponent],
    imports: [CommonModule, TableModule],
    exports: [OverviewComponent],
})
export class OverviewModule {}
