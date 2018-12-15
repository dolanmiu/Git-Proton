import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CloseButtonComponent } from './close-button.component';

describe('CloseButtonComponent', () => {
    let component: CloseButtonComponent;
    let fixture: ComponentFixture<CloseButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CloseButtonComponent],
            providers: [
                {
                    provide: Store,
                    useValue: {
                        select: () => Observable.empty(),
                    },
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CloseButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
