import { CdkTableModule } from '@angular/cdk/table';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdInputModule, MdTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { OverviewComponent } from './overview.component';

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
