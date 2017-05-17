import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitRepoComponent } from './init-repo.component';

describe('InitRepoComponent', () => {
    let component: InitRepoComponent;
    let fixture: ComponentFixture<InitRepoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InitRepoComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InitRepoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
