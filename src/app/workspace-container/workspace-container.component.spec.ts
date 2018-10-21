import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppCommonModule } from '../common/common.module';
import { TabBarModule } from './tab-bar/tab-bar.module';
import { WorkspaceContainerComponent } from './workspace-container.component';

describe('WorkspaceContainerComponent', () => {
    let component: WorkspaceContainerComponent;
    let fixture: ComponentFixture<WorkspaceContainerComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [WorkspaceContainerComponent],
                imports: [RouterTestingModule, NoopAnimationsModule, TabBarModule, AppCommonModule],
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
        fixture = TestBed.createComponent(WorkspaceContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
