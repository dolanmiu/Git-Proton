import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SettingsModule } from './settings/settings.module';
import { TabBarModule } from './tab-bar/tab-bar.module';
import { WorkspaceContainerRoutingModule } from './workspace-container-routing.module';
import { WorkspaceContainerComponent } from './workspace-container.component';
import { WorkspaceModule } from './workspace/workspace.module';

@NgModule({
    imports: [CommonModule, BrowserAnimationsModule, WorkspaceModule, WorkspaceContainerRoutingModule, TabBarModule, SettingsModule],
    declarations: [WorkspaceContainerComponent],
})
export class WorkspaceContainerModule {}
