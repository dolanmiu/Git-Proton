import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class Config {
    public writeConfig() {
        ipcRenderer.send('write-config', 'test');
    }
}