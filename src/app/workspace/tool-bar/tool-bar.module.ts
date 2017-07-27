import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdMenuModule, MdToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { ToolBarComponent } from './tool-bar.component';

@NgModule({
    declarations: [ToolBarComponent],
    imports: [
        CommonModule,
        MdButtonModule,
        MdToolbarModule,
        MdMenuModule,
        RouterModule,
    ],
    exports: [
        ToolBarComponent,
    ],
})
export class ToolBarModule { }
