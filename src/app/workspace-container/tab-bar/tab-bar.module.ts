import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabBarComponent } from './tab-bar.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [TabBarComponent],
    exports: [TabBarComponent],
})
export class TabBarModule {}
