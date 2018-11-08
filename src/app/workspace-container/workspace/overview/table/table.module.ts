import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { TableComponent } from './table.component';

@NgModule({
    imports: [CommonModule, InfiniteScrollModule],
    declarations: [TableComponent],
    exports: [TableComponent],
})
export class TableModule {}
