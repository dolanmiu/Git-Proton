import { ipcMain } from 'electron';

import { fetch, fetchAll } from './fetch';
import stage from './git-stage';
import unstage from './git-unstage';
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

        ipcMain.on('fetch', (event, projectDetails: ProjectPathDetails) => {
            fetch(projectDetails.path);
        });

        ipcMain.on('fetch-all', (event, projectDetails: ProjectPathDetails) => {
            fetchAll(projectDetails.path);
        });

        ipcMain.on('stage', (event, projectDetails: ProjectPathDetails, files: string[]) => {
            stage(projectDetails.path, files, () => {});
        });

        ipcMain.on('unstage', (event, projectDetails: ProjectPathDetails, files: string[]) => {
            unstage(projectDetails.path, files, () => {});
        });
    }
}
