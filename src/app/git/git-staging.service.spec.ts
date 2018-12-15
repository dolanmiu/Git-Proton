import { inject, TestBed } from '@angular/core/testing';

import { GitStagingService } from './git-staging.service';

describe('GitStagingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitStagingService],
        });
    });

    it(
        'should be created',
        inject([GitStagingService], (service: GitStagingService) => {
            expect(service).toBeTruthy();
        }),
    );
});
