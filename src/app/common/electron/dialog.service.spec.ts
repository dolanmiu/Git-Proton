import { inject, TestBed } from '@angular/core/testing';

import { ProjectPathService } from '../project-path.service';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DialogService, ProjectPathService],
        });
    });

    it(
        'should ...',
        inject([DialogService], (service: DialogService) => {
            expect(service).toBeTruthy();
        }),
    );
});
