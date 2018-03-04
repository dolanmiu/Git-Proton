import { ipcMain } from 'electron';

import walk from './walk';

export class NodeGitIPC {

    public listen(): void {
        ipcMain.on('open-repo', (event, arg) => {
            // this.nodeGit.openRepo(arg).subscribe((data) => {
            //     event.sender.send('open-repo', data);
            // });
            walk(arg, (commit) => {
                event.sender.send('open-repo', commit);
            });
        });
    }
}
