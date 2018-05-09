import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagedFilesContainerComponent } from './staged-files-container.component';

describe('StagedFilesContainerComponent', () => {
    let component: StagedFilesContainerComponent;
    let fixture: ComponentFixture<StagedFilesContainerComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [StagedFilesContainerComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(StagedFilesContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
