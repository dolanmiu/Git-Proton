import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InitRepoRoutingModule } from './init-repo-routing.module';
import { InitRepoComponent } from './init-repo.component';

@NgModule({
    declarations: [InitRepoComponent],
    imports: [CommonModule, InitRepoRoutingModule],
})
export class InitRepoModule {}
