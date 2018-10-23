export abstract class ElectronSwitchService {
    protected get IsElectron(): boolean {
        return window && window.process && window.process.type;
    }
}
