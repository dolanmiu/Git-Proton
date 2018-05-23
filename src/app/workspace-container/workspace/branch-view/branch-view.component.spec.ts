import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from 'app/material.module';
import { BranchViewComponent } from './branch-view.component';

describe('BranchViewComponent', () => {
    let component: BranchViewComponent;
    let fixture: ComponentFixture<BranchViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BranchViewComponent],
            imports: [NoopAnimationsModule, MaterialModule],
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
        fixture = TestBed.createComponent(BranchViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
