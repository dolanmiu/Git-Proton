import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { getCredentials } from 'app/store';
import { SetSshCredentialsAction } from 'app/store/persistance/persistance.actions';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
    public form: FormGroup;
    public credentials$: Observable<PersistanceCredentials>;

    constructor(private store: Store<AppState>) {
        this.credentials$ = store.select(getCredentials);
    }

    public ngOnInit(): void {
        console.log('on init');
        this.credentials$
            .do((credentials) => {
                console.log('credentials', credentials);
                this.form = new FormGroup({
                    privateSshKey: new FormControl(credentials.ssh.privateKey),
                    publicSshKey: new FormControl(credentials.ssh.publicKey),
                });
            })
            .take(1)
            .subscribe();
    }

    public update(): void {
        this.store.dispatch(
            new SetSshCredentialsAction({
                privateKey: this.form.get('privateSshKey').value,
                publicKey: this.form.get('publicSshKey').value,
                default: true,
            }),
        );
    }
}
