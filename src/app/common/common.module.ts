import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ElectronModule } from './electron/electron.module';
import { GitModule } from './git/git.module';
import { ProjectPathService } from './project-path.service';

@NgModule({
    imports: [CommonModule, ElectronModule, GitModule, RouterModule],
    providers: [ProjectPathService],
})
export class GitProtonCommonModule {}
