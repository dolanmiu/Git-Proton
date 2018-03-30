import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CloseButtonComponent } from './close-button.component';

describe('CloseButtonComponent', () => {
    let component: CloseButtonComponent;
    let fixture: ComponentFixture<CloseButtonComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [CloseButtonComponent],
                imports: [FontAwesomeModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CloseButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
