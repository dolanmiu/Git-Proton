import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { ToolBarComponent } from './tool-bar.component';

@NgModule({
    declarations: [ToolBarComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        RouterModule,
    ],
    exports: [
        ToolBarComponent,
    ],
})
export class ToolBarModule { }
