import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ElementComponent } from './element/element.component';
import { TableComponent } from './table.component';
import { BottomRightComponent } from './element/bottom-right/bottom-right.component';
import { VerticalComponent } from './element/vertical/vertical.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        TableComponent,
        ElementComponent,
        BottomRightComponent,
        VerticalComponent,
    ],
    exports: [
        TableComponent,
    ],
})
export class TableModule { }
