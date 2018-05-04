import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { GitProtonCommonModule } from '../../../common/common.module';
import { OpenRepoComponent } from './open-repo.component';
import { RepoButtonComponent } from './repo-button/repo-button.component';

describe('OpenRepoComponent', () => {
    let component: OpenRepoComponent;
    let fixture: ComponentFixture<OpenRepoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OpenRepoComponent, RepoButtonComponent],
            imports: [GitProtonCommonModule, StoreModule.forRoot({})],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OpenRepoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
