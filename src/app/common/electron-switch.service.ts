import { ipcRenderer } from 'electron';

export abstract class ElectronSwitchService {
    protected readonly ipcRenderer: typeof ipcRenderer;

    constructor() {
        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }
    }

    protected get IsElectron(): boolean {
        return window && window.process && window.process.type;
    }
}
