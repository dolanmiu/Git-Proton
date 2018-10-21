import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { GitStagingService } from 'app/common/git/git-staging.service';
import { ProjectPathService } from 'app/common/project-path.service';
import { GitCommitService } from '../../../common/git/git-commit.service';
import { CommitViewComponent } from './commit-view.component';
import { StagedFilesContainerComponent } from './staged-files-container/staged-files-container.component';
import { UnstagedFilesContainerComponent } from './unstaged-files-container/unstaged-files-container.component';

describe('CommitViewComponent', () => {
    let component: CommitViewComponent;
    let fixture: ComponentFixture<CommitViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommitViewComponent, StagedFilesContainerComponent, UnstagedFilesContainerComponent],
            imports: [FormsModule, NoopAnimationsModule],
            providers: [
                GitStagingService,
                GitCommitService,
                ProjectPathService,
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
        fixture = TestBed.createComponent(CommitViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
