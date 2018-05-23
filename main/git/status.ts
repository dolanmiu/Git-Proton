import * as nodegit from 'nodegit';

// This code shows working directory changes similar to git status
export default function walk(directory: string, fn: (data: StatusData[]) => void): void {
    nodegit.Repository.open(directory).then((repo) => {
        repo.getStatus().then((statuses) => {
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

            fn(
                statuses.map((status) => {
                    const statusText = status.status()[0];

                    return {
                        changeType: statusToText(status),
                        status: statusText || 'UNKNOWN',
                        isStaged: statusText.split('_')[0] === 'INDEX' ? true : false,
                    } as StatusData;
                }),
            );
        });
    });
}
