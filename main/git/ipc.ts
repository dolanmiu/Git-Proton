import { ipcMain } from 'electron';

import { branch, checkoutBranch, getCurrentBranch } from './branch';
import { fetch, fetchAll } from './fetch';
import commit from './git-commit';
import diff from './git-diff';
import stage from './git-stage';
import unstage from './git-unstage';
import { pushViaHttp, pushViaSsh } from './push';
import getReferences from './references';
import { createRemote, getRemotes, deleteRemote } from './remote';
import { pop, stash } from './stash';
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
            })
                .then()
                .catch(console.error);
        });

        ipcMain.on('get-status', (event, projectDetails: ProjectPathDetails) => {
            status(projectDetails.path)
                .then((statuses) => {})
                .catch(console.error);
        });

        ipcMain.on('get-references', (event, projectDetails: ProjectPathDetails) => {
            getReferences(projectDetails.path)
                .then((references) => {
                    event.sender.send('references', {
                        projectName: projectDetails.name,
                        references: references,
                    } as ReferencesIPCData);
                })
                .catch(console.error);
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

        ipcMain.on('commit', (event, projectDetails: ProjectPathDetails, name: string, email: string, message: string) => {
            commit(projectDetails.path, name, email, message, () => {});
        });

        ipcMain.on('checkout-branch', (event, projectDetails: ProjectPathDetails, referenceName: string) => {
            checkoutBranch(projectDetails.path, referenceName)
                .then((reference) => {})
                .catch(console.error);
        });

        ipcMain.on('git:create-branch', (event, projectDetails: ProjectPathDetails, referenceName: string) => {
            branch(projectDetails.path, referenceName)
                .then((reference) => {})
                .catch(console.error);
        });

        ipcMain.on('get-current-branch', (event, projectDetails: ProjectPathDetails) => {
            getCurrentBranch(projectDetails.path)
                .then((currentBranch) => {
                    event.sender.send('current-branch', {
                        projectName: projectDetails.name,
                        reference: currentBranch,
                    } as ReferenceIPCData);
                })
                .catch(console.error);
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

        ipcMain.on('stash', (event, projectDetails: ProjectPathDetails) => {
            stash(projectDetails.path)
                .then((oid) => {})
                .catch(console.error);
        });

        ipcMain.on('pop', (event, projectDetails: ProjectPathDetails) => {
            pop(projectDetails.path)
                .then((result) => {})
                .catch(console.error);
        });

        ipcMain.on('push-via-ssh', (event, projectDetails: ProjectPathDetails, referenceName: string, gitUrl: string) => {
            pushViaSsh(projectDetails.path, referenceName, gitUrl)
                .then((result) => {})
                .catch(console.error);
        });

        ipcMain.on(
            'push-via-http',
            (
                event,
                projectDetails: ProjectPathDetails,
                referenceName: string,
                headReferenceName: string,
                userName: string,
                password: string,
            ) => {
                pushViaHttp(projectDetails.path, referenceName, headReferenceName, userName, password)
                    .then((result) => {})
                    .catch(console.error);
            },
        );

        ipcMain.on('get-remotes', (event, projectDetails: ProjectPathDetails) => {
            getRemotes(projectDetails.path)
                .then((result) => {
                    const remotes: RemoteData[] = result.map((remote) => ({
                        url: remote.url(),
                        name: remote.name(),
                    }));
                    event.sender.send('remotes', {
                        projectName: projectDetails.name,
                        remotes: remotes,
                    } as RemoteIPCData);
                })
                .catch(console.error);
        });

        ipcMain.on('create-remote', (event, projectDetails: ProjectPathDetails, name: string, url: string) => {
            createRemote(projectDetails.path, name, url)
                .then((result) => {})
                .catch(console.error);
        });

        ipcMain.on('delete-remote', (event, projectDetails: ProjectPathDetails, name: string) => {
            deleteRemote(projectDetails.path, name)
                .then((result) => {})
                .catch(console.error);
        });
    }
}
