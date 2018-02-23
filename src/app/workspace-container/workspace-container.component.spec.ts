import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from 'app/material.module';
import { WorkspaceContainerComponent } from './workspace-container.component';

describe('WorkspaceContainerComponent', () => {
    let component: WorkspaceContainerComponent;
    let fixture: ComponentFixture<WorkspaceContainerComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [WorkspaceContainerComponent],
                imports: [RouterTestingModule, NoopAnimationsModule, MaterialModule],
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
