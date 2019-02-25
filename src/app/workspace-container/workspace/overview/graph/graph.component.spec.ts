import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GraphComponent } from './graph.component';

describe('GraphComponent', () => {
    let component: GraphComponent;
    let fixture: ComponentFixture<GraphComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GraphComponent],
            providers: [
                {
                    provide: Store,
                    useValue: {
                        select: () => {
                            return Observable.never();
                        },
                    },
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GraphComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
