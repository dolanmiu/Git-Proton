import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElectronModule } from './common/electron/electron.module';
import { GitModule } from './common/git/git.module';
import { RepoManagerModule } from './repo-manager/repo-manager.module';
import { AppStoreModule } from './store/app-store.module';
import { WorkspaceModule } from './workspace/workspace.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, AppStoreModule, RepoManagerModule, WorkspaceModule, ElectronModule, GitModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
