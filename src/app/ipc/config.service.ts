import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class Config {

    public writeConfig(directory: string) {
        ipcRenderer.send('write-config', directory);
    }

    public loadConfig(callback: (repos: Array<Repo>) => void) {
        console.log('loading config');
        ipcRenderer.send('load-config');
        ipcRenderer.once('load-config-reply', (event, arg) => {
            callback(arg);
        });
    }
}
