import { Injectable } from '@angular/core';
import * as settings from 'electron-settings';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class SettingsService extends ElectronSwitchService {
    private settings: typeof settings;
    // tslint:disable-next-line:no-any
    private setSettingSwitcheroo: ElectronSwitcheroo<void, string, any>;
    // tslint:disable-next-line:no-any
    private getSettingSwitcheroo: ElectronSwitcheroo<any, string>;

    constructor() {
        super();

        if (this.IsElectron) {
            this.settings = window.require('electron-settings');
        }

        this.setSettingSwitcheroo = new ElectronSwitcheroo(
            (key, payload) => {
                this.settings.set(key, payload);
            },
            (a) => {
                console.log('pretending to set setting');
            },
        );

        this.getSettingSwitcheroo = new ElectronSwitcheroo(
            (key) => {
                return this.settings.get(key);
            },
            () => {
                console.log('Pretending to get settings');
            },
        );
    }

    public getSetting<T>(property: string): T {
        return this.getSettingSwitcheroo.execute(property);
    }

    public setSetting<T>(property: string, payload: T): void {
        this.setSettingSwitcheroo.execute(property, payload);
    }
}
