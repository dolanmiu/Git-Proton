import { inject, TestBed } from '@angular/core/testing';

import { GitDiffService } from './git-diff.service';

describe('GitDiffService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitDiffService],
        });
    });

    it(
        'should be created',
        inject([GitDiffService], (service: GitDiffService) => {
            expect(service).toBeTruthy();
        }),
    );
});
