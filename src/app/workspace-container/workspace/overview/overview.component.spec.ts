import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from 'app/material.module';
import { OverviewComponent } from './overview.component';
import { TableModule } from './table/table.module';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let fixture: ComponentFixture<OverviewComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [OverviewComponent],
                imports: [NoopAnimationsModule, MaterialModule, StoreModule.forRoot({}), TableModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
