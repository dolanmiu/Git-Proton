import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenRepoComponent } from './open-repo.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: OpenRepoComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class OpenRepoRoutingModule {}
