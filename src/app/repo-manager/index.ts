import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RepoManagerComponent } from './repo-manager.component';
import { RepoButtonComponent } from './open-repo/repo-button/repo-button.component';

// import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    RepoManagerComponent,
    RepoButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  exports: [RepoManagerComponent]
})
export class RepoManagerModule { }
