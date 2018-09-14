import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkspaceContainerComponent } from './workspace-container.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'workspace',
                component: WorkspaceContainerComponent,
                children: [
                    {
                        path: 'settings',
                        loadChildren: './settings/settings.module#SettingsModule',
                    },
                    {
                        path: 'new',
                        loadChildren: './repo-manager/repo-manager.module#RepoManagerModule',
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
