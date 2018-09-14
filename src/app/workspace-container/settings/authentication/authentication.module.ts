import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
    imports: [CommonModule, AuthenticationRoutingModule, AuthenticationRoutingModule],
    declarations: [AuthenticationComponent],
})
export class AuthenticationModule {}
