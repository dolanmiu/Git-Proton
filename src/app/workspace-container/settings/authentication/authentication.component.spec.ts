import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { getCredentials } from 'app/store';
import { MockStore } from 'testing';
import { AuthenticationComponent } from './authentication.component';

describe('AuthenticationComponent', () => {
    let component: AuthenticationComponent;
    let fixture: ComponentFixture<AuthenticationComponent>;

    const mockStore = new MockStore();
    mockStore.getSubjectFromSelector(getCredentials).next({
        ssh: {
            privateKey: '',
            publicKey: '',
            default: true,
        },
    } as PersistanceCredentials);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthenticationComponent],
            imports: [ReactiveFormsModule],
            providers: [
                {
                    provide: Store,
                    useValue: mockStore,
                },
            ],
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
