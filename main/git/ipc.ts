import { ipcMain } from 'electron';

import walk from './walk';

export class NodeGitIPC {
    public listen(): void {
        ipcMain.on('open-repo', (event, projectDetails: ProjectPathDetails) => {
            // this.nodeGit.openRepo(arg).subscribe((data) => {
            //     event.sender.send('open-repo', data);
            // });
            walk(projectDetails.path, (commit) => {
                event.sender.send('commit', {
                    projectName: projectDetails.name,
                    commit: commit,
                });
            });
        });
    }
}
