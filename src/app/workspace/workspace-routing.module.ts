import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkspaceComponent } from './workspace.component';
import { RepoManagerComponent } from '../repo-manager/repo-manager.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: WorkspaceComponent,
                children: [
                    { path: '' },
                    { path: 'repo', component: RepoManagerComponent },
                ],
            },
        ]),
    ],
    exports: [
        RouterModule,
    ],
})
export class WorkspaceRoutingModule { }
