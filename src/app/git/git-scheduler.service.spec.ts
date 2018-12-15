import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GitSchedulerService } from './git-scheduler.service';

describe('GitSchedulerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GitSchedulerService,
                {
                    provide: Store,
                    useValue: {
                        select: () => Observable.empty(),
                    },
                },
            ],
        });
    });

    it(
        'should be created',
        inject([GitSchedulerService], (service: GitSchedulerService) => {
            expect(service).toBeTruthy();
        }),
    );
});
