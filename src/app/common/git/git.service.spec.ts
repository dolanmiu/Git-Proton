import { inject, TestBed } from '@angular/core/testing';

import { GitService } from './git.service';
import { TreeModule } from './tree/tree.module';

describe('GitService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GitService],
            imports: [
                TreeModule,
            ],
        });
    });

    it('should ...', inject([GitService], (service: GitService) => {
        expect(service).toBeTruthy();
    }));
});
