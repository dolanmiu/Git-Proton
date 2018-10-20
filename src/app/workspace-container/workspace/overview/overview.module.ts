import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from 'app/material.module';
import { OverviewComponent } from './overview.component';
import { TableModule } from './table/table.module';

@NgModule({
    declarations: [OverviewComponent],
    imports: [CommonModule, MaterialModule, TableModule],
    exports: [OverviewComponent],
})
export class OverviewModule {}
