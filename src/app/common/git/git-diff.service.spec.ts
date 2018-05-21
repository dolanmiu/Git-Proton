import { inject, TestBed } from '@angular/core/testing';

import { ProjectPathService } from '../project-path.service';
import { GitDiffService } from './git-diff.service';

describe('GitDiffService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitDiffService, ProjectPathService],
        });
    });

    it(
        'should be created',
        inject([GitDiffService], (service: GitDiffService) => {
            expect(service).toBeTruthy();
        }),
    );
});
