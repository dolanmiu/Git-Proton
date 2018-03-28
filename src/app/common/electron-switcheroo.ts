export class ElectronSwitcheroo<T, R = void, S = void> {
    constructor(private electron: (a1: R, a2: S) => T, private web: (a1: R, a2: S) => T) {}

    public execute(a1?: R, a2?: S): T {
        if (this.IsElectron) {
            return this.electron(a1, a2);
        } else {
            return this.web(a1, a2);
        }
    }

    private get IsElectron(): void {
        return window && window.process && window.process.type;
    }
}
