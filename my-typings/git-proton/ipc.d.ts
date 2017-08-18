declare type IpcChannel = 'open-repo';

interface IpcRenderer extends Electron.IpcRenderer {
    once(channel: IpcChannel, listener: Function): this;
}
