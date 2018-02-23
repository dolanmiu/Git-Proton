import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'app/material.module';
import { CommitViewComponent } from './commit-view.component';
import { FileSelectComponent } from './file-select/file-select.component';

describe('CommitViewComponent', () => {
    let component: CommitViewComponent;
    let fixture: ComponentFixture<CommitViewComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [CommitViewComponent, FileSelectComponent],
                imports: [NoopAnimationsModule, MaterialModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CommitViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
