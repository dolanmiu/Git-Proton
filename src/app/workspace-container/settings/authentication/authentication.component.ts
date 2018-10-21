import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SettingsService } from 'app/common/electron/settings.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
    public form: FormGroup;

    constructor(private settingsService: SettingsService) {}

    public ngOnInit(): void {
        const privateKey = this.settingsService.getSetting('credentials', 'ssh', 'privateKey');

        this.form = new FormGroup({
            privateSshKey: new FormControl(privateKey),
        });
    }

    public update(): void {
        this.settingsService.setSetting<string>('credentials.ssh.privateKey', this.form.get('privateSshKey').value);
    }
}
