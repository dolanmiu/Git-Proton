import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from 'app/material.module';
import { RepoManagerComponent } from './repo-manager.component';

describe('RepoManagerComponent', () => {
    let component: RepoManagerComponent;
    let fixture: ComponentFixture<RepoManagerComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [RepoManagerComponent],
                imports: [
                    NoopAnimationsModule,
                    RouterTestingModule.withRoutes([{ path: '', component: RepoManagerComponent }]),
                    MaterialModule,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(RepoManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
