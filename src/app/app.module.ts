import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GitProtonCommonModule } from './common/common.module';
import { AppStoreModule } from './store/app-store.module';
import { WorkspaceContainerModule } from './workspace-container/workspace-container.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FontAwesomeModule, AppRoutingModule, AppStoreModule, WorkspaceContainerModule, GitProtonCommonModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
