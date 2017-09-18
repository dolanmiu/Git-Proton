import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdInputModule, MdTableModule } from '@angular/material';

import { OverviewComponent } from './overview.component';
import { TableModule } from './table/table.module';

@NgModule({
    declarations: [
        OverviewComponent,
    ],
    imports: [
        CommonModule,
        MdInputModule,
        MdTableModule,
        CdkTableModule,
        TableModule,
    ],
    exports: [
        OverviewComponent,
    ],
})
export class OverviewModule { }
