import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectPathService } from '../project-path.service';
import { GitStatusService } from './git-status.service';

describe('GitStatusService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GitStatusService,
                ProjectPathService,
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
        inject([GitStatusService], (service: GitStatusService) => {
            expect(service).toBeTruthy();
        }),
    );
});
