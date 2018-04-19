import { ipcMain } from 'electron';

import getReferences from './references';
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

        ipcMain.on('get-references', (event, projectDetails: ProjectPathDetails) => {
            getReferences(projectDetails.path, (references) => {
                event.sender.send('references', {
                    projectName: projectDetails.name,
                    references: references,
                } as ReferenceIPCData);
            });
        });
    }
}
