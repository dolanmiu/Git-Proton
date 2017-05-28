import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElectronModule } from './electron/electron.module';
import { RepoManagerModule } from './repo-manager/repo-manager.module';
import { WorkspaceModule } from './workspace/workspace.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RepoManagerModule,
        WorkspaceModule,
        ElectronModule,
    ],
    providers: [],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule { }
