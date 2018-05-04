import { inject, TestBed } from '@angular/core/testing';

import { ProjectPathService } from '../project-path.service';
import { GitFetchService } from './git-fetch.service';

describe('GitFetchService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitFetchService, ProjectPathService],
        });
    });

    it(
        'should be created',
        inject([GitFetchService], (service: GitFetchService) => {
            expect(service).toBeTruthy();
        }),
    );
});
