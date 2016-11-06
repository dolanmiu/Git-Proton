import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RepoManagerModule } from './repo-manager';
import { WorkspaceModule } from './workspace';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    WorkspaceModule,
    RepoManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
