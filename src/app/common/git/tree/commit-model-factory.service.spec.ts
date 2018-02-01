import { inject, TestBed } from '@angular/core/testing';

import { CommitModelFactoryService } from './commit-model-factory.service';

describe('CommitModelFactoryService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CommitModelFactoryService],
        });
    });

    it(
        'should be created',
        inject([CommitModelFactoryService], (service: CommitModelFactoryService) => {
            expect(service).toBeTruthy();
        }),
    );
});
