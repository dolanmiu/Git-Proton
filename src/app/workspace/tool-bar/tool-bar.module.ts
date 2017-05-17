import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdMenuModule, MdToolbarModule } from '@angular/material';

import { ToolBarComponent } from './tool-bar.component';

@NgModule({
    declarations: [ToolBarComponent],
    imports: [
        CommonModule,
        MdButtonModule,
        MdToolbarModule,
        MdMenuModule,
    ],
    exports: [
        ToolBarComponent,
    ],
})
export class ToolBarModule { }
