import { inject, TestBed } from '@angular/core/testing';

import { GitReferenceService } from './git-reference.service';

describe('GitReferenceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitReferenceService],
        });
    });

    it(
        'should be created',
        inject([GitReferenceService], (service: GitReferenceService) => {
            expect(service).toBeTruthy();
        }),
    );
});
