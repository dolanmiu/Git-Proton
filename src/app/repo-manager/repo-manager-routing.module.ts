import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RepoManagerComponent } from './repo-manager.component';
import { OpenRepoComponent } from './open-repo/open-repo.component';
import { CloneRepoComponent } from './clone-repo/clone-repo.component';
import { InitRepoComponent } from './init-repo/init-repo.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: RepoManagerComponent,
                children: [
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
