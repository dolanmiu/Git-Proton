import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { WorkspaceComponent } from './workspace.component';

import { WorkspaceRoutingModule } from './workspace-routing.module';

@NgModule({
  declarations: [
    ToolBarComponent,
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WorkspaceRoutingModule
  ],
  providers: [],
  exports: [WorkspaceComponent]
})
export class WorkspaceModule { }
