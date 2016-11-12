import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RepoManagerModule } from './repo-manager';
import { WorkspaceModule } from './workspace';

import { AppRoutingModule } from './app-routing.module';
import { IPCModule } from './ipc/ipc.module';

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
    RepoManagerModule,
    MaterialModule.forRoot(),
    IPCModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
