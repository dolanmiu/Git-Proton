import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../material.module';
import { BranchViewComponent } from './branch-view.component';

describe('BranchViewComponent', () => {
    let component: BranchViewComponent;
    let fixture: ComponentFixture<BranchViewComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [BranchViewComponent],
                imports: [NoopAnimationsModule, MaterialModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(BranchViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
