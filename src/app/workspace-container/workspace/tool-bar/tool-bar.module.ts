import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GitModule } from 'app/common/git/git.module';
import { MaterialModule } from 'app/material.module';
import { ToolBarComponent } from './tool-bar.component';

@NgModule({
    declarations: [ToolBarComponent],
    imports: [CommonModule, MaterialModule, RouterModule, GitModule],
    exports: [ToolBarComponent],
})
export class ToolBarModule {}
