import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkspaceComponent } from './workspace.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'workspace', component: WorkspaceComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class WorkspaceRoutingModule { }