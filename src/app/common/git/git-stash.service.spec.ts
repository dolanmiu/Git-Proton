import { inject, TestBed } from '@angular/core/testing';

import { ProjectPathService } from '../project-path.service';
import { GitStashService } from './git-stash.service';

describe('GitStashService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitStashService, ProjectPathService],
        });
    });

    it(
        'should be created',
        inject([GitStashService], (service: GitStashService) => {
            expect(service).toBeTruthy();
        }),
    );
});
