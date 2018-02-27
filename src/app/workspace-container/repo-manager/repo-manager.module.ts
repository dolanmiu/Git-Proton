import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from 'app/material.module';
import { CloneRepoModule } from './clone-repo/clone-repo.module';
import { InitRepoModule } from './init-repo/init-repo.module';
import { OpenRepoModule } from './open-repo/open-repo.module';
import { RepoManagerRoutingModule } from './repo-manager-routing.module';
import { RepoManagerComponent } from './repo-manager.component';

@NgModule({
    declarations: [RepoManagerComponent],
    imports: [
        CommonModule,
        RepoManagerRoutingModule,
        OpenRepoModule,
        InitRepoModule,
        CloneRepoModule,
        MaterialModule,
    ],
})
export class RepoManagerModule {}
