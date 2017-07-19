import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdButtonModule, MdIconModule, MdInputModule, MdListModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CommitViewComponent } from './commit-view.component';

describe('CommitViewComponent', () => {
    let component: CommitViewComponent;
    let fixture: ComponentFixture<CommitViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommitViewComponent],
            imports: [
                NoopAnimationsModule,
                MdListModule,
                MdIconModule,
                MdInputModule,
                MdButtonModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommitViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
