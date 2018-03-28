import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'environments/environment';
import { ProjectsEffects } from './projects/projects.effects';
import { REDUCERS } from './reducers';
import { CustomSerializer } from './router/custom-serializer';
import { TreeEffects } from './tree/tree.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot(REDUCERS),
        EffectsModule.forRoot([TreeEffects, ProjectsEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        StoreRouterConnectingModule,
    ],
    declarations: [],
    providers: [
        {
            provide: RouterStateSerializer,
            useClass: CustomSerializer,
        },
    ],
})
export class AppStoreModule {}
