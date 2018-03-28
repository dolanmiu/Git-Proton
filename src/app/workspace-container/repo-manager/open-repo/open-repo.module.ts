import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GitProtonCommonModule } from '../../../common/common.module';
import { OpenRepoRoutingModule } from './open-repo-routing.module';
import { OpenRepoComponent } from './open-repo.component';
import { RepoButtonComponent } from './repo-button/repo-button.component';

@NgModule({
    declarations: [OpenRepoComponent, RepoButtonComponent],
    imports: [CommonModule, OpenRepoRoutingModule, GitProtonCommonModule],
    exports: [OpenRepoComponent],
})
export class OpenRepoModule {}
