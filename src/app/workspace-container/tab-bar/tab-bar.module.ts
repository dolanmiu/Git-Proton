import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CloseButtonComponent } from './close-button/close-button.component';
import { NewTabComponent } from './new-tab/new-tab.component';
import { TabBarComponent } from './tab-bar.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [TabBarComponent, TabComponent, CloseButtonComponent, NewTabComponent],
    exports: [TabBarComponent],
})
export class TabBarModule {}
