import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ToolBarComponent } from './tool-bar.component';

describe('ToolBarComponent', () => {
    let component: ToolBarComponent;
    let fixture: ComponentFixture<ToolBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToolBarComponent],
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
        fixture = TestBed.createComponent(ToolBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
