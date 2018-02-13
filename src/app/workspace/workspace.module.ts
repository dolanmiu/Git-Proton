import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'app/material.module';
import { BranchViewModule } from './branch-view/branch-view.module';
import { CommitViewModule } from './commit-view/commit-view.module';
import { FooterModule } from './footer/footer.module';
import { OverviewModule } from './overview/overview.module';
import { ToolBarModule } from './tool-bar/tool-bar.module';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';

@NgModule({
    declarations: [WorkspaceComponent],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        WorkspaceRoutingModule,
        MaterialModule,
        ToolBarModule,
        BranchViewModule,
        CommitViewModule,
        OverviewModule,
        FooterModule,
    ],
})
export class WorkspaceModule {}
