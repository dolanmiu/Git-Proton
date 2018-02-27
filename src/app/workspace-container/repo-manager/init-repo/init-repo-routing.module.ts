import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitRepoComponent } from './init-repo.component';

const routes: Routes = [
    {
        path: '',
        component: InitRepoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InitRepoRoutingModule {}
