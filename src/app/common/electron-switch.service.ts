export abstract class ElectronSwitchService<T, R = void, S = void> {
    constructor(electronContructor?: () => void, webContstructor?: () => void) {
        if (this.IsElectron) {
            if (webContstructor) {
                electronContructor();
            }
        } else {
            if (webContstructor) {
                webContstructor();
            }
        }
    }

    private get IsElectron(): void {
        return window && window.process && window.process.type;
    }

    protected switch(a1?: R, a2?: S): T {
        if (this.IsElectron) {
            return this.electron(a1, a2);
        } else {
            return this.web(a1, a2);
        }
    }

    protected abstract web(a1?: R, a2?: S): T;
    protected abstract electron(a1?: R, a2?: S): T;
}
