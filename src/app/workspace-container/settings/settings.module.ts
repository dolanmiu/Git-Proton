import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthenticationModule } from './authentication/authentication.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
    imports: [CommonModule, SettingsRoutingModule, AuthenticationModule],
    declarations: [SettingsComponent],
    exports: [SettingsComponent],
})
export class SettingsModule {}
