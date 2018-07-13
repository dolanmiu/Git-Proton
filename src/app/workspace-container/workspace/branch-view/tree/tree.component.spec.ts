import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { TreeModule } from 'angular-tree-component';
import { Observable } from 'rxjs';

import { TreeComponent } from './tree.component';

describe('TreeComponent', () => {
    let component: TreeComponent;
    let fixture: ComponentFixture<TreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TreeComponent],
            imports: [TreeModule],
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
        fixture = TestBed.createComponent(TreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
