import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TabBarComponent } from './tab-bar.component';

describe('TabBarComponent', () => {
    let component: TabBarComponent;
    let fixture: ComponentFixture<TabBarComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [TabBarComponent],
                imports: [RouterTestingModule],
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
        fixture = TestBed.createComponent(TabBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
