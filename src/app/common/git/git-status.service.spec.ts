import { inject, TestBed } from '@angular/core/testing';

import { ProjectPathService } from '../project-path.service';
import { GitStatusService } from './git-status.service';

describe('GitStatusService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitStatusService, ProjectPathService],
        });
    });

    it(
        'should be created',
        inject([GitStatusService], (service: GitStatusService) => {
            expect(service).toBeTruthy();
        }),
    );
});
