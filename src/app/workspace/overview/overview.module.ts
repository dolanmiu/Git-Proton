import { CdkTableModule } from '@angular/cdk';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdInputModule, MdTableModule } from '@angular/material';

import { OverviewComponent } from './overview.component';

@NgModule({
    declarations: [
        OverviewComponent,
    ],
    imports: [
        CommonModule,
        MdInputModule,
        MdTableModule,
        CdkTableModule,
    ],
    exports: [
        OverviewComponent,
    ],
})
export class OverviewModule { }
