import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RepoManagerComponent } from './repo-manager.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: RepoManagerComponent,
                children: [
                    { path: '', redirectTo: 'open', pathMatch: 'full' },
                    { path: 'open', loadChildren: './open-repo/open-repo.module#OpenRepoModule' },
                    { path: 'clone', loadChildren: './clone-repo/clone-repo.module#CloneRepoModule' },
                    { path: 'init', loadChildren: './init-repo/init-repo.module#InitRepoModule' },
                ],
                data: {
                    page: 'repo-manager',
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class RepoManagerRoutingModule {}
