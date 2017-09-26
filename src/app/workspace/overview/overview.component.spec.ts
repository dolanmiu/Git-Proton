import { CdkTableModule } from '@angular/cdk/table';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdInputModule, MdTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { OverviewComponent } from './overview.component';
import { TableModule } from './table/table.module';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let fixture: ComponentFixture<OverviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OverviewComponent],
            imports: [
                NoopAnimationsModule,
                MdInputModule,
                MdTableModule,
                CdkTableModule,
                StoreModule.forRoot({}),
                TableModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
