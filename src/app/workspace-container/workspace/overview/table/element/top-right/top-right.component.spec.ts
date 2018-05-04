import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRightComponent } from './top-right.component';

describe('TopRightComponent', () => {
    let component: TopRightComponent;
    let fixture: ComponentFixture<TopRightComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TopRightComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopRightComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
