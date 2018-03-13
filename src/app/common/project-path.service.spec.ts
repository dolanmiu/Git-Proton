import { inject, TestBed } from '@angular/core/testing';

import { ProjectPathService } from './project-path.service';

describe('ProjectPathService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ProjectPathService],
        });
    });

    it(
        'should be created',
        inject([ProjectPathService], (service: ProjectPathService) => {
            expect(service).toBeTruthy();
        }),
    );
});
