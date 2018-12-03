import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToolBarComponent } from './tool-bar.component';

@NgModule({
    declarations: [ToolBarComponent],
    imports: [CommonModule, RouterModule],
    exports: [ToolBarComponent],
})
export class ToolBarModule {}
