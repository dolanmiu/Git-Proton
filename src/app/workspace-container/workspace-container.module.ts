import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material.module';
import { WorkspaceContainerRoutingModule } from './workspace-container-routing.module';
import { WorkspaceContainerComponent } from './workspace-container.component';
import { WorkspaceModule } from './workspace/workspace.module';

@NgModule({
    imports: [CommonModule, BrowserAnimationsModule, MaterialModule, WorkspaceModule, WorkspaceContainerRoutingModule],
    declarations: [WorkspaceContainerComponent],
})
export class WorkspaceContainerModule {}
