import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OpenRepoRoutingModule } from './open-repo-routing.module';
import { OpenRepoComponent } from './open-repo.component';
import { RepoButtonComponent } from './repo-button/repo-button.component';

@NgModule({
    declarations: [
        OpenRepoComponent,
        RepoButtonComponent,
    ],
    imports: [
        CommonModule,
        OpenRepoRoutingModule,
    ],
    exports: [
        OpenRepoComponent,
    ],
})
export class OpenRepoModule { }
