import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { TreeModule } from 'angular-tree-component';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from 'app/material.module';
import { GitReferenceService } from '../../../common/git/git-reference.service';
import { GitRemoteService } from '../../../common/git/git-remote.service';
import { BranchViewComponent } from './branch-view.component';
import { TreeComponent } from './tree/tree.component';

describe('BranchViewComponent', () => {
    let component: BranchViewComponent;
    let fixture: ComponentFixture<BranchViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BranchViewComponent, TreeComponent],
            imports: [NoopAnimationsModule, MaterialModule, TreeModule],
            providers: [
                {
                    provide: Store,
                    useValue: {
                        select: () => Observable.empty(),
                    },
                },
                GitReferenceService,
                GitRemoteService,
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
