import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneRepoComponent } from './clone-repo.component';

describe('CloneRepoComponent', () => {
    let component: CloneRepoComponent;
    let fixture: ComponentFixture<CloneRepoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CloneRepoComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CloneRepoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
