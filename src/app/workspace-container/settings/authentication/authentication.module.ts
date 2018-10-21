import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppCommonModule } from 'app/common/common.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, AppCommonModule, AuthenticationRoutingModule, AuthenticationRoutingModule],
    declarations: [AuthenticationComponent],
})
export class AuthenticationModule {}
