import { inject, TestBed } from '@angular/core/testing';

import { ProjectPathService } from '../project-path.service';
import { GitCommitService } from './git-commit.service';

describe('GitCommitService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitCommitService, ProjectPathService],
        });
    });

    it(
        'should be created',
        inject([GitCommitService], (service: GitCommitService) => {
            expect(service).toBeTruthy();
        }),
    );
});
