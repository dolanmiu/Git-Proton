import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from 'app/material.module';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { WorkspaceContainerComponent } from './workspace-container.component';

describe('WorkspaceContainerComponent', () => {
    let component: WorkspaceContainerComponent;
    let fixture: ComponentFixture<WorkspaceContainerComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [WorkspaceContainerComponent, TabBarComponent],
                imports: [RouterTestingModule, NoopAnimationsModule, MaterialModule],
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
