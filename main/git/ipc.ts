
import { ipcMain } from 'electron';

import { GitWrapper } from './git-wrapper';

export class NodeGitIPC {
    private nodeGit: GitWrapper;

    constructor() {
        this.nodeGit = new GitWrapper();
    }

    public listen(): void {
        ipcMain.on('open-repo', (event, arg) => {
            console.log(arg); // prints "ping"
            event.returnValue = 'pong';
            this.nodeGit.openRepo(arg).subscribe();
        });
    }
}
