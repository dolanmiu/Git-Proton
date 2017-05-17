import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { RepoManagerComponent } from './repo-manager.component';

describe('RepoManagerComponent', () => {
    let component: RepoManagerComponent;
    let fixture: ComponentFixture<RepoManagerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepoManagerComponent],
            imports: [
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: RepoManagerComponent },
                ]),
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepoManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
