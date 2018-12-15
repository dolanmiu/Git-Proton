import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { TreeModule } from 'angular-tree-component';
import { Observable } from 'rxjs';

import { BranchViewComponent } from './branch-view.component';
import { TreeComponent } from './tree/tree.component';

describe('BranchViewComponent', () => {
    let component: BranchViewComponent;
    let fixture: ComponentFixture<BranchViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BranchViewComponent, TreeComponent],
            imports: [NoopAnimationsModule, ReactiveFormsModule, TreeModule],
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
