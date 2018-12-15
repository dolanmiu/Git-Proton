export class ElectronSwitcheroo<T, R = void, S = void, Q = void, U = void, V = void> {
    constructor(
        private readonly electron: (a1: R, a2: S, a3: Q, a4: U, a5: V) => T,
        private readonly web: (a1: R, a2: S, a3: Q, a4: U, a5: V) => T,
    ) {}

    public execute(a1?: R, a2?: S, a3?: Q, a4?: U, a5?: V): T {
        if (this.IsElectron) {
            return this.electron(a1, a2, a3, a4, a5);
        } else {
            return this.web(a1, a2, a3, a4, a5);
        }
    }

    private get IsElectron(): boolean {
        return window && window.process && window.process.type;
    }
}
