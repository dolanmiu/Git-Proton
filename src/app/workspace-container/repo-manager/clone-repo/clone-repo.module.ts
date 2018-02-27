import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CloneRepoRoutingModule } from './clone-repo-routing.module';
import { CloneRepoComponent } from './clone-repo.component';

@NgModule({
    declarations: [CloneRepoComponent],
    imports: [CommonModule, CloneRepoRoutingModule],
})
export class CloneRepoModule {}
