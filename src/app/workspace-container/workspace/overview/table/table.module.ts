import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from 'app/material.module';
import { BottomLeftComponent } from './element/bottom-left/bottom-left.component';
import { BottomRightComponent } from './element/bottom-right/bottom-right.component';
import { DataComponent } from './element/data/data.component';
import { ElementComponent } from './element/element.component';
import { HorizontalComponent } from './element/horizontal/horizontal.component';
import { TopLeftComponent } from './element/top-left/top-left.component';
import { TopRightComponent } from './element/top-right/top-right.component';
import { VerticalComponent } from './element/vertical/vertical.component';
import { TableComponent } from './table.component';

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [
        TableComponent,
        ElementComponent,
        BottomRightComponent,
        VerticalComponent,
        TopLeftComponent,
        TopRightComponent,
        HorizontalComponent,
        BottomLeftComponent,
        DataComponent,
    ],
    exports: [TableComponent],
})
export class TableModule {}
