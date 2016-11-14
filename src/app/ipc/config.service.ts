import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class Config {

    constructor(private zone: NgZone) {
    }

    public writeConfig(directory: string) {
        ipcRenderer.send('write-config', directory);
    }

    public loadConfig(callback: (repos: Array<Repo>) => void) {
        console.log('loading config');
        ipcRenderer.send('load-config');
        ipcRenderer.once('load-config-reply', (event, arg) => {
            this.zone.runOutsideAngular(() => {
                this.zone.run(() => {
                    callback(arg);
                });
            });
        });
    }
}
