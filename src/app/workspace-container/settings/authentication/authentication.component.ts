import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getCredentials } from 'app/store';
import { SetHttpsCredentialsAction, SetSshCredentialsAction } from 'app/store/persistance/persistance.actions';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
    // tslint:disable-next-line:readonly-keyword
    public form: FormGroup;
    public readonly credentials$: Observable<PersistanceCredentials>;

    constructor(private readonly store: Store<AppState>) {
        this.credentials$ = store.select(getCredentials);
    }

    public ngOnInit(): void {
        this.credentials$
            .do((credentials) => {
                // tslint:disable-next-line:no-object-mutation
                this.form = new FormGroup({
                    privateSshKey: new FormControl(credentials.ssh.privateKey),
                    publicSshKey: new FormControl(credentials.ssh.publicKey),
                    httpsUsername: new FormControl(credentials.https.username),
                    httpsPassword: new FormControl(credentials.https.password),
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
        this.store.dispatch(
            new SetHttpsCredentialsAction({
                username: this.form.get('httpsUsername').value,
                password: this.form.get('httpsPassword').value,
            }),
        );
    }
}
