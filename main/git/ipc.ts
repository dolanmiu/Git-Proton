import { ipcMain } from 'electron';

import branch from './branch';
import { fetch, fetchAll } from './fetch';
import commit from './git-commit';
import diff from './git-diff';
import stage from './git-stage';
import unstage from './git-unstage';
import getReferences from './references';
import status from './status';
import walk from './walk';

export class NodeGitIPC {
    public listen(): void {
        ipcMain.on('open-repo', (event, projectDetails: ProjectPathDetails) => {
            walk(projectDetails.path, (data) => {
                event.sender.send('commit', {
                    projectName: projectDetails.name,
                    commit: data,
                } as CommitIPCData);
            }).then().catch(console.error);
        });

        ipcMain.on('get-status', (event, projectDetails: ProjectPathDetails) => {
            status(projectDetails.path)
                .then((statuses) => {})
                .catch(console.error);
        });

        ipcMain.on('get-references', (event, projectDetails: ProjectPathDetails) => {
            getReferences(projectDetails.path).then((references) => {
                event.sender.send('references', {
                    projectName: projectDetails.name,
                    references: references,
                } as ReferenceIPCData);
            }).catch(console.error);
        });

        ipcMain.on('fetch', (event, projectDetails: ProjectPathDetails) => {
            fetch(projectDetails.path).catch(console.error);
        });

        ipcMain.on('fetch-all', (event, projectDetails: ProjectPathDetails) => {
            fetchAll(projectDetails.path);
        });

        ipcMain.on('stage', (event, projectDetails: ProjectPathDetails, files: string[]) => {
            stage(projectDetails.path, files, (oid) => {
                console.log(oid);
            });
        });

        ipcMain.on('unstage', (event, projectDetails: ProjectPathDetails, files: string[]) => {
            unstage(projectDetails.path, files, () => {});
        });

        ipcMain.on('commit', (event, projectDetails: ProjectPathDetails, files: string[]) => {
            commit(projectDetails.path, '', '', () => {});
        });

        ipcMain.on('create-branch', (event, projectDetails: ProjectPathDetails, branchName: string) => {
            branch(projectDetails.path, branchName).then((reference) => {}).catch(console.error);
        });

        ipcMain.on('diff', (event, projectDetails: ProjectPathDetails, files: string[]) => {
            diff(projectDetails.path)
                .then((statuses) => {
                    event.sender.send('statuses', {
                        projectName: projectDetails.name,
                        statuses: statuses,
                    } as StatusIPCData);
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }
}
