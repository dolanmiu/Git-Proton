import { inject, TestBed } from '@angular/core/testing';

import { GitService } from './git.service';

describe('GitService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitService],
        });
    });

    it('should ...', inject([GitService], (service: GitService) => {
        expect(service).toBeTruthy();
    }));
});
