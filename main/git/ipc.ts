
import { ipcMain } from 'electron';

import { GitWrapper } from './git-wrapper';

export class NodeGitIPC {
    private nodeGit: GitWrapper;

    constructor() {
        this.nodeGit = new GitWrapper();
    }

    public listen(): void {
        console.log('listening');
        ipcMain.on('open-repo', (event, arg) => {
            console.log(arg); // prints "ping"
            this.nodeGit.openRepo(arg).subscribe((data) => {
                console.log(data.getMasterCommit());
                event.sender.send('open-repo', data);
            });
        });
    }
}
