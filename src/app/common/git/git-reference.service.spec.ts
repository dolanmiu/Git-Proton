import { inject, TestBed } from '@angular/core/testing';

import { ProjectPathService } from '../project-path.service';
import { GitReferenceService } from './git-reference.service';

describe('GitReferenceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitReferenceService, ProjectPathService],
        });
    });

    it(
        'should be created',
        inject([GitReferenceService], (service: GitReferenceService) => {
            expect(service).toBeTruthy();
        }),
    );
});
