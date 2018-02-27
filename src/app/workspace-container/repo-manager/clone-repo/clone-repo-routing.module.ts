import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CloneRepoComponent } from './clone-repo.component';

const routes: Routes = [
    {
        path: '',
        component: CloneRepoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CloneRepoRoutingModule {}
