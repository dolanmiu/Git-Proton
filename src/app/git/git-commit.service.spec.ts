import { inject, TestBed } from '@angular/core/testing';

import { GitCommitService } from './git-commit.service';

describe('GitCommitService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitCommitService],
        });
    });

    it(
        'should be created',
        inject([GitCommitService], (service: GitCommitService) => {
            expect(service).toBeTruthy();
        }),
    );
});
