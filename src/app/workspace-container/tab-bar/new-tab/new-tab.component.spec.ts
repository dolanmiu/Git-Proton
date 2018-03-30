import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NewTabComponent } from './new-tab.component';

describe('NewTabComponent', () => {
    let component: NewTabComponent;
    let fixture: ComponentFixture<NewTabComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [NewTabComponent],
                imports: [FontAwesomeModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(NewTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
