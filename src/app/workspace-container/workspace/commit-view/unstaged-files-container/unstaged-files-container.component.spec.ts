import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitStagingService } from 'app/common/git/git-staging.service';
import { ProjectPathService } from 'app/common/project-path.service';
import { UnstagedFilesContainerComponent } from './unstaged-files-container.component';

describe('UnstagedFilesContainerComponent', () => {
    let component: UnstagedFilesContainerComponent;
    let fixture: ComponentFixture<UnstagedFilesContainerComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [UnstagedFilesContainerComponent],
                providers: [GitStagingService, ProjectPathService],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(UnstagedFilesContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
