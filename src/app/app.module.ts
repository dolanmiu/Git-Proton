import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ToolbarModule } from './tool-bar';
import { RepoManagerComponent } from './repo-manager/repo-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    RepoManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'repo', component: RepoManagerComponent }
    ]),
    ToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
