import { ipcMain } from 'electron';

import status from './status';
import walk from './walk';

export class NodeGitIPC {
    public listen(): void {
        ipcMain.on('open-repo', (event, projectDetails: ProjectPathDetails) => {
            walk(projectDetails.path, (commit) => {
                event.sender.send('commit', {
                    projectName: projectDetails.name,
                    commit: commit,
                } as CommitIPCData);
            });
        });

        ipcMain.on('get-status', (event, projectDetails: ProjectPathDetails) => {
            status(projectDetails.path, (statuses) => {
                event.sender.send('statuses', {
                    projectName: projectDetails.name,
                    statuses: statuses,
                } as StatusIPCData);
            });
        });
    }
}
