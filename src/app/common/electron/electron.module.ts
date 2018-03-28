import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogService } from './dialog.service';
import { SettingsService } from './settings.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [DialogService, SettingsService],
})
export class ElectronModule {}
