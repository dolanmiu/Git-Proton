import { ipcMain } from 'electron';

import { fetch, fetchAll } from './fetch';
import { commit } from './git-commit';
import diff from './git-diff';
import { stage, unstage } from './git-stage';
import { pushViaHttp, pushViaSsh } from './push';
import { branch, checkoutBranch, getReferences } from './references';
import { createRemote, deleteRemote, getRemotes } from './remote';
import { pop, stash } from './stash';
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

        // ipcMain.on('get-status', (event, project: ProjectState) => {
        //     status(project.path)
        //         .then((statuses) => {})
        //         .catch(console.error);
        // });

        ipcMain.on('get-references', async (event, project: ProjectState) => {
            try {
                const references = await getReferences(project.path);

                event.sender.send('get-references-result', undefined, {
                    projectName: project.name,
                    references: references,
                } as ReferencesIPCData);
            } catch (e) {
                event.sender.send('get-references-result', e);
            }
        });

        ipcMain.on('fetch', async (event, project: ProjectState) => {
            try {
                const result = await fetch(project.path);

                console.log(result);
                event.sender.send('fetch-result', undefined, result);
            } catch (e) {
                event.sender.send('fetch-result', e);
            }
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

        ipcMain.on('checkout-branch', async (event, project: ProjectState, referenceName: string) => {
            try {
                await checkoutBranch(project.path, referenceName);
                const references = await getReferences(project.path);

                event.sender.send('checkout-branch-result', undefined, {
                    projectName: project.name,
                    references: references,
                } as ReferencesIPCData);
            } catch (e) {
                console.log(e);
                event.sender.send('checkout-branch-result', e);
            }
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

        ipcMain.on('get-diff', async (event, project: ProjectState, files: string[]) => {
            try {
                const statuses = await diff(project.path);

                event.sender.send('get-diff-result', undefined, {
                    projectName: project.name,
                    statuses: statuses,
                } as StatusIPCData);
            } catch (e) {
                event.sender.send('get-diff-result', e);
            }
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

        ipcMain.on('get-remotes', async (event, project: ProjectState) => {
            try {
                const result = await getRemotes(project.path);

                const remotes: RemoteData[] = result.map((remote) => ({
                    url: remote.url(),
                    name: remote.name(),
                }));
                event.sender.send('get-remotes-result', undefined, {
                    projectName: project.name,
                    remotes: remotes,
                } as RemoteIPCData);
            } catch (e) {
                event.sender.send('get-remotes-result', e);
            }
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
