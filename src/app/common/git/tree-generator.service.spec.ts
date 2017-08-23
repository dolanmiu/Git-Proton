import { inject, TestBed } from '@angular/core/testing';

import { TreeGeneratorService } from './tree-generator.service';

describe('TreeGeneratorService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TreeGeneratorService],
        });
    });

    it('should be created', inject([TreeGeneratorService], (service: TreeGeneratorService) => {
        expect(service).toBeTruthy();
    }));
});
