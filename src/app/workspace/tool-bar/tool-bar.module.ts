import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'app/material.module';
import { ToolBarComponent } from './tool-bar.component';

@NgModule({
    declarations: [ToolBarComponent],
    imports: [CommonModule, MaterialModule, RouterModule, FlexLayoutModule],
    exports: [ToolBarComponent],
})
export class ToolBarModule {}
