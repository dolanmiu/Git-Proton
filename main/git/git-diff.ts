import * as nodegit from 'nodegit';

// tslint:disable-next-line:no-any
function statusToText(status: any): StatusChangeType {
    if (status.isModified()) {
        return 'MODIFIED';
    }
    if (status.isTypechange()) {
        return 'TYPECHANGE';
    }
    if (status.isRenamed()) {
        return 'RENAMED';
    }
    if (status.isIgnored()) {
        return 'IGNORED';
    }
    if (status.isDeleted()) {
        return 'DELETED';
    }
}

// This function finds the diff. Similar to 'git show'
async function diffWorkdir(directory: string): Promise<StatusData[]> {
    const repo = await nodegit.Repository.open(directory);
    const currentDiff = await nodegit.Diff.indexToWorkdir(repo, null, {});
    const patches = await currentDiff.patches();

    const statusData = [];

    for (const patch of patches) {
        const hunksData = [];

        const hunks = await patch.hunks();

        for (const hunk of hunks) {
            const hunkData = {
                lines: [],
                header: hunk.header(),
            };

            const lines = await hunk.lines();

            for (const line of lines) {
                hunkData.lines.push({
                    origin: String.fromCharCode(line.origin()),
                    content: line.content(),
                });
            }
            hunksData.push(hunkData);
        }

        statusData.push({
            changeType: 'MODIFIED',
            status: patch.status() || 'UNKNOWN',
            isStaged: false,
            oldFile: {
                path: patch.oldFile().path(),
            },
            newFile: {
                path: patch.newFile().path(),
            },
            hunks: hunksData,
        } as StatusData);
    }

    return statusData;
}

async function diffIndex(directory: string): Promise<StatusData[]> {
    const repo = await nodegit.Repository.open(directory);

    const headCommit = await repo.getReferenceCommit('HEAD');
    const tree = await headCommit.getTree();

    const currentDiff = await nodegit.Diff.treeToIndex(repo, tree, null, {});
    const patches = await currentDiff.patches();

    const statusData = [];

    for (const patch of patches) {
        const hunksData = [];

        const hunks = await patch.hunks();

        for (const hunk of hunks) {
            const hunkData = {
                lines: [],
                header: hunk.header(),
            };

            const lines = await hunk.lines();

            for (const line of lines) {
                hunkData.lines.push({
                    origin: String.fromCharCode(line.origin()),
                    content: line.content(),
                });
            }
            hunksData.push(hunkData);
        }

        statusData.push({
            changeType: 'MODIFIED',
            status: patch.status() || 'UNKNOWN',
            isStaged: true,
            oldFile: {
                path: patch.oldFile().path(),
            },
            newFile: {
                path: patch.newFile().path(),
            },
            hunks: hunksData,
        } as StatusData);
    }

    return statusData;
}

export default async function diff(directory: string): Promise<StatusData[]> {
    const workdirDiff = diffWorkdir(directory);
    const indexDiff = diffIndex(directory);

    const [a, b] = await Promise.all([workdirDiff, indexDiff]);

    return [...a, ...b];
}
