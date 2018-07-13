import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { GitStagingService } from 'app/common/git/git-staging.service';
import { ProjectPathService } from 'app/common/project-path.service';
import { UnstagedFilesContainerComponent } from './unstaged-files-container.component';

describe('UnstagedFilesContainerComponent', () => {
    let component: UnstagedFilesContainerComponent;
    let fixture: ComponentFixture<UnstagedFilesContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UnstagedFilesContainerComponent],
            providers: [
                GitStagingService,
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
        fixture = TestBed.createComponent(UnstagedFilesContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
