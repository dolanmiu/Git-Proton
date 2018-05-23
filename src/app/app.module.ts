import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store/app-store.module';
import { WorkspaceContainerModule } from './workspace-container/workspace-container.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, AppStoreModule, WorkspaceContainerModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
