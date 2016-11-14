import { Config } from './config';
import { ipcMain } from 'electron';
import * as nconf from 'nconf';

nconf.argv().env();

let config = new Config();

let load = () => {
    console.log('loading config reader');

    ipcMain.on('write-config', (event, arg) => {
        console.log(arg);
        config.writeConfig(arg);
    });

    ipcMain.on('load-config', (event, arg) => {
        let projects = config.load();
        event.sender.send('load-config-reply', projects);
    });
};

export { load }
