import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CloseButtonComponent } from './close-button.component';

describe('CloseButtonComponent', () => {
    let component: CloseButtonComponent;
    let fixture: ComponentFixture<CloseButtonComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [CloseButtonComponent],
                imports: [FontAwesomeModule],
                providers: [
                    {
                        provide: Store,
                        useValue: {
                            select: () => Observable.empty(),
                        },
                    },
                ],
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
