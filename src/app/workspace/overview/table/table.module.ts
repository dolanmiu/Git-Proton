import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ElementComponent } from './element/element.component';
import { TableComponent } from './table.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        TableComponent,
        ElementComponent,
    ],
    exports: [
        TableComponent,
    ],
})
export class TableModule { }
