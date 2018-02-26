import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkspaceContainerComponent } from './workspace-container.component';
import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'workspace',
                component: WorkspaceContainerComponent,
                children: [
                    {
                        path: 'new',
                        component: WorkspaceComponent,
                        data: { page: 'blank' },
                    },
                    {
                        path: '**',
                        redirectTo: 'new',
                        data: { page: 'workspace' },
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class WorkspaceContainerRoutingModule {}
