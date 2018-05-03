import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CloseButtonComponent } from '../close-button/close-button.component';
import { TabComponent } from './tab.component';

describe('TabComponent', () => {
    let component: TabComponent;
    let fixture: ComponentFixture<TabComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [TabComponent, CloseButtonComponent],
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
        fixture = TestBed.createComponent(TabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
