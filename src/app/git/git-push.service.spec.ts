import { inject, TestBed } from '@angular/core/testing';

import { GitPushService } from './git-push.service';

describe('GitPushService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitPushService],
        });
    });

    it(
        'should be created',
        inject([GitPushService], (service: GitPushService) => {
            expect(service).toBeTruthy();
        }),
    );
});
