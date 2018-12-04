import { inject, TestBed } from '@angular/core/testing';

import { GitFetchService } from './git-fetch.service';

describe('GitFetchService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitFetchService],
        });
    });

    it(
        'should be created',
        inject([GitFetchService], (service: GitFetchService) => {
            expect(service).toBeTruthy();
        }),
    );
});
