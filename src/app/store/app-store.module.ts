import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProjectsEffects } from './projects/projects.effects';
import { REDUCERS } from './reducers';
import { TreeEffects } from './tree/tree.effects';

@NgModule({
    imports: [CommonModule, StoreModule.forRoot(REDUCERS), EffectsModule.forRoot([TreeEffects, ProjectsEffects])],
    declarations: [],
})
export class AppStoreModule {}
