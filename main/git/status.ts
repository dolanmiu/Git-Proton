import * as nodegit from 'nodegit';

// tslint:disable-next-line:no-any
function statusToText(status: any): StatusChangeType {
    if (status.isNew()) {
        return 'NEW';
    }
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

// This code shows working directory changes similar to git status
export default async function walk(directory: string): Promise<StatusData[]> {
    const repo = await nodegit.Repository.open(directory);
    const statuses = await repo.getStatus();

    return statuses.map((status) => {
        const statusText = status.status()[0];

        return {
            changeType: statusToText(status),
            status: statusText || 'UNKNOWN',
            isStaged: statusText.split('_')[0] === 'INDEX' ? true : false,
        } as StatusData;
    });
}
