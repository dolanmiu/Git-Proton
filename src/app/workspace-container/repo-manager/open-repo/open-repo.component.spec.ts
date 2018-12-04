import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { GitModule } from 'app/git/git.module';

import { AppCommonModule } from '../../../common/common.module';
import { OpenRepoComponent } from './open-repo.component';
import { RepoButtonComponent } from './repo-button/repo-button.component';

describe('OpenRepoComponent', () => {
    let component: OpenRepoComponent;
    let fixture: ComponentFixture<OpenRepoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OpenRepoComponent, RepoButtonComponent],
            imports: [AppCommonModule, StoreModule.forRoot({}), GitModule],
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
