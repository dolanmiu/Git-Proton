import { inject, TestBed } from '@angular/core/testing';

import { GitStashService } from './git-stash.service';

describe('GitStashService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitStashService],
        });
    });

    it(
        'should be created',
        inject([GitStashService], (service: GitStashService) => {
            expect(service).toBeTruthy();
        }),
    );
});
