import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'environments/environment';
import { AppEffects } from './app/app.effects';
import { PersistanceEffects } from './persistance/persistance.effects';
import { ProjectsEffects } from './projects/projects.effects';
import { META_REDUCERS, REDUCERS } from './reducers';
import { CustomSerializer } from './router/custom-serializer';
import { TreeEffects } from './tree/tree.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot(REDUCERS, {
            metaReducers: META_REDUCERS,
            initialState: {
                projects: {
                    projects: {},
                    loading: {
                        remotes: false,
                    },
                },
                persistance: {
                    credentials: {
                        ssh: {
                            privateKey: '',
                            publicKey: '',
                            default: false,
                        },
                        https: {
                            username: '',
                            password: '',
                        },
                    },
                },
            },
        }),
        EffectsModule.forRoot([AppEffects, TreeEffects, ProjectsEffects, PersistanceEffects]),
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
