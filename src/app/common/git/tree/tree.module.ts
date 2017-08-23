import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommitModelFactoryService } from './commit-model-factory.service';
import { TreeGeneratorService } from './tree-generator.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        CommitModelFactoryService,
        TreeGeneratorService,
    ],
})
export class TreeModule { }
