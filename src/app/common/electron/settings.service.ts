import { Injectable } from '@angular/core';
import * as settings from 'electron-settings';

import { ElectronSwitchService } from '../electron-switch.service';

@Injectable()
export class SettingsService extends ElectronSwitchService<void, string> {
    private settings: typeof settings;

    constructor() {
        super();

        if (this.IsElectron) {
            this.settings = window.require('electron-settings');
        }
    }

    public getSetting(property: string): void {
        return this.switch(property);
    }

    public setSetting(property: string): void {
        return this.switch(property);
    }

    protected electron(property: string): void {
        // this.settings.set('name', {
        //     first: 'Cosmo',
        //     last: 'Kramer',
        // });
        console.log(this.settings.get(property));
    }

    protected web(property: string): void {
        console.log('Pretending to get settings');
    }
}
