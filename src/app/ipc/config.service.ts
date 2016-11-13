import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class Config {

    public writeConfig(directory: string) {
        ipcRenderer.send('write-config', directory);
    }
}
