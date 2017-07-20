import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CloneRepoComponent } from './clone-repo/clone-repo.component';
import { InitRepoComponent } from './init-repo/init-repo.component';
import { OpenRepoComponent } from './open-repo/open-repo.component';
import { RepoManagerComponent } from './repo-manager.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'repo-manager', component: RepoManagerComponent,
                children: [
                    { path: '', redirectTo: 'open', pathMatch: 'full' },
                    { path: 'open', component: OpenRepoComponent },
                    { path: 'clone', component: CloneRepoComponent },
                    { path: 'init', component: InitRepoComponent },
                ],
            },
        ]),
    ],
    exports: [
        RouterModule,
    ],
})
export class RepoManagerRoutingModule { }
