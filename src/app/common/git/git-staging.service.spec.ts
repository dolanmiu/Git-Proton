import { inject, TestBed } from '@angular/core/testing';

import { ProjectPathService } from '../project-path.service';
import { GitStagingService } from './git-staging.service';

describe('GitStagingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitStagingService, ProjectPathService],
        });
    });

    it(
        'should be created',
        inject([GitStagingService], (service: GitStagingService) => {
            expect(service).toBeTruthy();
        }),
    );
});
