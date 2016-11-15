import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { WorkspaceComponent } from './workspace.component';
import { BranchViewComponent } from './branch-view/branch-view.component';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { CommitViewComponent } from './commit-view/commit-view.component';

import { WorkspaceRoutingModule } from './workspace-routing.module';

@NgModule({
  declarations: [
    ToolBarComponent,
    WorkspaceComponent,
    BranchViewComponent,
    TreeViewComponent,
    CommitViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WorkspaceRoutingModule,
    MaterialModule.forRoot(),
  ],
  providers: [],
  exports: [WorkspaceComponent],
})
export class WorkspaceModule { }
