import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'app/material.module';
import { OverviewComponent } from './overview.component';
import { TableModule } from './table/table.module';

@NgModule({
    declarations: [OverviewComponent],
    imports: [CommonModule, MaterialModule, TableModule, FlexLayoutModule],
    exports: [OverviewComponent],
})
export class OverviewModule {}
