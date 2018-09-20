import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            { path: '', redirectTo: 'general', pathMatch: 'full' },
            { path: 'authentication', loadChildren: './authentication/authentication.module#AuthenticationModule' },
            { path: 'about', loadChildren: './about/about.module#AboutModule' },
            { path: 'general', loadChildren: './general/general.module#GeneralModule' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
