import { ipcMain } from 'electron';

import { branch, checkoutBranch, getCurrentBranch } from './branch';
import { fetch, fetchAll } from './fetch';
import { commit } from './git-commit';
import diff from './git-diff';
import { stage, unstage } from './git-stage';
import { pushViaHttp, pushViaSsh } from './push';
import getReferences from './references';
import { createRemote, deleteRemote, getRemotes } from './remote';
import { pop, stash } from './stash';
import status from './status';
import walk from './walk';

export class NodeGitIPC {
    public listen(): void {
        ipcMain.on('open-repo', (event, project: ProjectState) => {
            walk(project.path, (data) => {
                event.sender.send('commit', {
                    projectName: project.name,
                    commit: data,
                } as CommitIPCData);
            })
                .then()
                .catch(console.error);
        });

        ipcMain.on('get-status', (event, project: ProjectState) => {
            status(project.path)
                .then((statuses) => {})
                .catch(console.error);
        });

        ipcMain.on('get-references', (event, project: ProjectState) => {
            getReferences(project.path)
                .then((references) => {
                    event.sender.send('references', {
                        projectName: project.name,
                        references: references,
                    } as ReferencesIPCData);
                })
                .catch(console.error);
        });

        ipcMain.on('fetch', (event, project: ProjectState) => {
            fetch(project.path).catch(console.error);
        });

        ipcMain.on('fetch-all', (event, project: ProjectState) => {
            fetchAll(project.path);
        });

        ipcMain.on('stage', async (event, project: ProjectState, files: string[]) => {
            try {
                const oid = await stage(project.path, files);
                const statuses = await diff(project.path);

                console.log(oid);
                event.sender.send('stage-result', undefined, {
                    projectName: project.name,
                    statuses: statuses,
                } as StatusIPCData);
            } catch (e) {
                event.sender.send('stage-result', e);
            }
        });

        ipcMain.on('unstage', async (event, project: ProjectState, files: string[]) => {
            try {
                await unstage(project.path, files);
                const statuses = await diff(project.path);

                event.sender.send('stage-result', undefined, {
                    projectName: project.name,
                    statuses: statuses,
                } as StatusIPCData);
            } catch (e) {
                event.sender.send('stage-result', e);
            }
        });

        ipcMain.on('commit', async (event, project: ProjectState, name: string, email: string, message: string) => {
            try {
                await commit(project.path, name, email, message);
                event.sender.send('commit-result', undefined, {
                    projectName: project.name,
                    commit: undefined,
                } as CommitIPCData);

                const statuses = await diff(project.path);

                event.sender.send('stage-result', undefined, {
                    projectName: project.name,
                    statuses: statuses,
                } as StatusIPCData);
            } catch (e) {
                event.sender.send('stage-result', e);
                event.sender.send('commit-result', e);
            }
        });

        ipcMain.on('checkout-branch', (event, project: ProjectState, referenceName: string) => {
            checkoutBranch(project.path, referenceName)
                .then((reference) => {})
                .catch(console.error);
        });

        ipcMain.on('git:create-branch', async (event, project: ProjectState, referenceName: string) => {
            try {
                const reference = await branch(project.path, referenceName);
                event.sender.send('git:create-branch-result', undefined, {
                    projectName: project.name,
                    reference: reference,
                } as ReferenceIPCData);
            } catch (e) {
                event.sender.send('git:create-branch-result', e);
            }
        });

        ipcMain.on('get-current-branch', (event, project: ProjectState) => {
            getCurrentBranch(project.path)
                .then((currentBranch) => {
                    event.sender.send('current-branch', {
                        projectName: project.name,
                        reference: currentBranch,
                    } as ReferenceIPCData);
                })
                .catch(console.error);
        });

        ipcMain.on('diff', (event, project: ProjectState, files: string[]) => {
            diff(project.path)
                .then((statuses) => {
                    event.sender.send('statuses', {
                        projectName: project.name,
                        statuses: statuses,
                    } as StatusIPCData);
                })
                .catch((err) => {
                    console.error(err);
                });
        });

        ipcMain.on('stash', async (event, project: ProjectState) => {
            try {
                const stashCount = await stash(project.path);
                console.log(stashCount);

                event.sender.send('stash-result', undefined, stashCount);
            } catch (e) {
                event.sender.send('stash-result', e);
            }
        });

        ipcMain.on('pop', async (event, project: ProjectState) => {
            try {
                const result = await pop(project.path);
                console.log(result);

                event.sender.send('pop-result', undefined, {});
            } catch (e) {
                event.sender.send('pop-result', e);
            }
        });

        ipcMain.on('push-via-ssh', (event, project: ProjectState, referenceName: string, gitUrl: string) => {
            pushViaSsh(project.path, referenceName, gitUrl)
                .then((result) => {})
                .catch(console.error);
        });

        ipcMain.on(
            'push-via-http',
            async (event, project: ProjectState, referenceName: string, headReferenceName: string, userName: string, password: string) => {
                try {
                    await pushViaHttp(project.path, referenceName, headReferenceName, userName, password);
                    event.sender.send('push-via-http-result');
                } catch (e) {
                    event.sender.send('push-via-http-result', e);
                }
            },
        );

        ipcMain.on('get-remotes', (event, project: ProjectState) => {
            getRemotes(project.path)
                .then((result) => {
                    const remotes: RemoteData[] = result.map((remote) => ({
                        url: remote.url(),
                        name: remote.name(),
                    }));
                    event.sender.send('remotes', {
                        projectName: project.name,
                        remotes: remotes,
                    } as RemoteIPCData);
                })
                .catch(console.error);
        });

        ipcMain.on('create-remote', (event, project: ProjectState, name: string, url: string) => {
            createRemote(project.path, name, url)
                .then((remote) =>
                    event.sender.send('create-remote-result', undefined, {
                        name,
                        url,
                    } as RemoteData),
                )
                .catch((e) => event.sender.send('create-remote-result', e));
        });

        ipcMain.on('delete-remote', (event, project: ProjectState, name: string) => {
            deleteRemote(project.path, name)
                .then((result) => {
                    event.sender.send('delete-remote-result', undefined, name);
                })
                .catch((e) => event.sender.send('delete-remote-result', e));
        });
    }
}
