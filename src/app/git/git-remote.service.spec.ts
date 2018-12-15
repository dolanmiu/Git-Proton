import { inject, TestBed } from '@angular/core/testing';

import { GitRemoteService } from './git-remote.service';

describe('GitRemoteService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitRemoteService],
        });
    });

    it(
        'should be created',
        inject([GitRemoteService], (service: GitRemoteService) => {
            expect(service).toBeTruthy();
        }),
    );
});
