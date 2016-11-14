import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RepoManagerComponent } from './repo-manager.component';
import { OpenRepoComponent } from './open-repo/open-repo.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: RepoManagerComponent,
                children: [
                    { path: 'open', component: OpenRepoComponent },
                ],
            },
        ]),
    ],
    exports: [
        RouterModule,
    ],
})
export class RepoManagerRoutingModule { }
