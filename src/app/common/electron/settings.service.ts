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

    public getSetting<
        a extends keyof PersistanceData,
        b extends keyof PersistanceData[a],
        c extends keyof PersistanceData[a][b],
        d extends keyof PersistanceData[a][b][c],
        e extends keyof PersistanceData[a][b][c][d],
        f extends keyof PersistanceData[a][b][c][d][e]
    // tslint:disable-next-line:no-any
    >(key1: a, key2?: b, key3?: c, key4?: d, key5?: e, key6?: f): any {
        const path = [key1, key2, key3, key4, key5, key6].filter((el) => el !== undefined).join('.');

        return this.getSettingSwitcheroo.execute(path);
    }

    public setSetting<T>(property: string, payload: T): void {
        this.setSettingSwitcheroo.execute(property, payload);
    }
}
