
import { ipcMain } from 'electron';

import { GitWrapper } from './git-wrapper';
import walk from './walk';

export class NodeGitIPC {
    private nodeGit: GitWrapper;

    constructor() {
        this.nodeGit = new GitWrapper();
    }

    public listen(): void {
        ipcMain.on('open-repo', (event, arg) => {
            // console.log(arg); // prints "ping"
            // this.nodeGit.openRepo(arg).subscribe((data) => {
            //     event.sender.send('open-repo', data);
            // });
            walk();
        });
    }
}
