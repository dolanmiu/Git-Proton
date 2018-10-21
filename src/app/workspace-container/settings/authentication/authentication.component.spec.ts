import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AppCommonModule } from 'app/common/common.module';
import { AuthenticationComponent } from './authentication.component';

describe('AuthenticationComponent', () => {
    let component: AuthenticationComponent;
    let fixture: ComponentFixture<AuthenticationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthenticationComponent],
            imports: [ReactiveFormsModule, AppCommonModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthenticationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
