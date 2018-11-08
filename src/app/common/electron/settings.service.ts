import { Injectable } from '@angular/core';
import * as settings from 'electron-settings';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class SettingsService extends ElectronSwitchService {
    private readonly settings: typeof settings;
    // tslint:disable-next-line:no-any
    private readonly setSettingSwitcheroo: ElectronSwitcheroo<void, string, any>;
    // tslint:disable-next-line:no-any
    private readonly getSettingSwitcheroo: ElectronSwitcheroo<any, string>;

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

    // tslint:disable:no-any
    public getSetting<
        a extends keyof PersistanceState,
        b extends keyof PersistanceState[a],
        c extends keyof PersistanceState[a][b],
        d extends keyof PersistanceState[a][b][c],
        e extends keyof PersistanceState[a][b][c][d],
        f extends keyof PersistanceState[a][b][c][d][e]
    >(key1?: a, key2?: b, key3?: c, key4?: d, key5?: e, key6?: f): any {
        const path = this.arrayToStringPath(key1, key2, key3, key4, key5, key6);

        return this.getSettingSwitcheroo.execute(path);
    }

    public setSetting<
        a extends keyof PersistanceState,
        b extends keyof PersistanceState[a],
        c extends keyof PersistanceState[a][b],
        d extends keyof PersistanceState[a][b][c],
        e extends keyof PersistanceState[a][b][c][d],
        f extends keyof PersistanceState[a][b][c][d][e]
    >(payload: any, key1: a, key2?: b, key3?: c, key4?: d, key5?: e, key6?: f): void {
        const path = this.arrayToStringPath(key1, key2, key3, key4, key5, key6);

        this.setSettingSwitcheroo.execute(path, payload);
    }

    private arrayToStringPath(...keys: any[]): string {
        return keys.filter((el) => el !== undefined).join('.');
    }
    // tslint:enable:no-any
}
