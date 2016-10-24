import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ToolBarComponent } from './tool-bar.component';

@NgModule({
  declarations: [
    ToolBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  exports: [ToolBarComponent]
})
export class ToolbarModule { }
