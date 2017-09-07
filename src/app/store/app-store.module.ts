import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { treeReducer } from './tree';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot({
            tree: treeReducer,
        }),
    ],
    declarations: [],
})
export class AppStoreModule { }
