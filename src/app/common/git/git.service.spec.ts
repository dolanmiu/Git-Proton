import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { ProjectPathService } from '../project-path.service';
import { GitService } from './git.service';
import { TreeModule } from './tree/tree.module';

describe('GitService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitService, ProjectPathService],
            imports: [TreeModule, StoreModule.forRoot({})],
        });
    });

    it(
        'should ...',
        inject([GitService], (service: GitService) => {
            expect(service).toBeTruthy();
        }),
    );
});
