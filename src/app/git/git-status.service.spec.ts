import { inject, TestBed } from '@angular/core/testing';

import { GitStatusService } from './git-status.service';

describe('GitStatusService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitStatusService],
        });
    });

    it(
        'should be created',
        inject([GitStatusService], (service: GitStatusService) => {
            expect(service).toBeTruthy();
        }),
    );
});
