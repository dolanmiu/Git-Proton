import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectPathService } from '../project-path.service';
import { GitDiffService } from './git-diff.service';
import { GitFetchService } from './git-fetch.service';
import { GitReferenceService } from './git-reference.service';
import { GitSchedulerService } from './git-scheduler.service';
import { GitStatusService } from './git-status.service';

describe('GitSchedulerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GitReferenceService,
                GitSchedulerService,
                GitStatusService,
                GitFetchService,
                GitDiffService,
                ProjectPathService,
                {
                    provide: Store,
                    useValue: {
                        select: () => Observable.empty(),
                    },
                },
            ],
        });
    });

    it(
        'should be created',
        inject([GitSchedulerService], (service: GitSchedulerService) => {
            expect(service).toBeTruthy();
        }),
    );
});
