import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { ProjectPathService } from 'app/common';

import { GitService } from './git.service';

describe('GitService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitService, ProjectPathService],
            imports: [StoreModule.forRoot({})],
        });
    });

    it(
        'should ...',
        inject([GitService], (service: GitService) => {
            expect(service).toBeTruthy();
        }),
    );
});
