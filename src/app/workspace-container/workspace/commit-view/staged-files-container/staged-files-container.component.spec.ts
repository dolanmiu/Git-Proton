import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { GitStagingService } from 'app/common/git/git-staging.service';
import { ProjectPathService } from 'app/common/project-path.service';
import { StagedFilesContainerComponent } from './staged-files-container.component';

describe('StagedFilesContainerComponent', () => {
    let component: StagedFilesContainerComponent;
    let fixture: ComponentFixture<StagedFilesContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StagedFilesContainerComponent],
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
        fixture = TestBed.createComponent(StagedFilesContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
