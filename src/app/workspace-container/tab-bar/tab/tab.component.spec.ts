import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseButtonComponent } from '../close-button/close-button.component';
import { TabComponent } from './tab.component';

describe('TabComponent', () => {
    let component: TabComponent;
    let fixture: ComponentFixture<TabComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [TabComponent, CloseButtonComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
