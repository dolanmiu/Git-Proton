import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomRightComponent } from './bottom-right.component';

describe('BottomRightComponent', () => {
    let component: BottomRightComponent;
    let fixture: ComponentFixture<BottomRightComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BottomRightComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BottomRightComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
