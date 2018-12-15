import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ElectronModule } from './electron/electron.module';
import { ProjectPathService } from './project-path.service';

@NgModule({
    imports: [CommonModule, ElectronModule, RouterModule],
    providers: [ProjectPathService],
})
export class AppCommonModule {}
