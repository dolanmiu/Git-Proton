import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
} from '@angular/material';

const MODULES = [
    MatInputModule,
    MatTableModule,
    CdkTableModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
];

@NgModule({
    imports: MODULES,
    exports: MODULES,
})
export class MaterialModule {}
