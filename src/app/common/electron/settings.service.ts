import { Injectable } from '@angular/core';
import * as settings from 'electron-settings';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class SettingsService extends ElectronSwitchService {
    private settings: typeof settings;
    private setSettingSwitcheroo: ElectronSwitcheroo<void, string>;
    private getSettingSwitcheroo: ElectronSwitcheroo<void, string>;

    constructor() {
        super();

        if (this.IsElectron) {
            this.settings = window.require('electron-settings');
        }

        this.setSettingSwitcheroo = new ElectronSwitcheroo(
            (property) => {
                this.settings.set('name', {
                    first: 'Cosmo',
                    last: 'Kramer',
                });
            },
            (a) => {
                console.log('pretending to set setting');
            },
        );

        this.getSettingSwitcheroo = new ElectronSwitcheroo(
            (property) => {
                this.settings.get(property);
            },
            () => {
                console.log('Pretending to get settings');
            },
        );
    }

    public getSetting(property: string): void {
        return this.getSettingSwitcheroo.execute(property);
    }

    public setSetting(property: string): void {
        return this.setSettingSwitcheroo.execute(property);
    }
}
