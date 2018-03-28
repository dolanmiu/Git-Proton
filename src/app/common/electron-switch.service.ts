export abstract class ElectronSwitchService {
    protected get IsElectron(): void {
        return window && window.process && window.process.type;
    }
}
