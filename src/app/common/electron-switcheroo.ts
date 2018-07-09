export class ElectronSwitcheroo<T, R = void, S = void, Q = void> {
    constructor(private electron: (a1: R, a2: S, a3: Q) => T, private web: (a1: R, a2: S, a3: Q) => T) {}

    public execute(a1?: R, a2?: S, a3?: Q): T {
        if (this.IsElectron) {
            return this.electron(a1, a2, a3);
        } else {
            return this.web(a1, a2, a3);
        }
    }

    private get IsElectron(): void {
        return window && window.process && window.process.type;
    }
}
