import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';

@NgModule({
    imports: [CommonModule, GeneralRoutingModule],
    declarations: [GeneralComponent],
})
export class GeneralModule {}
