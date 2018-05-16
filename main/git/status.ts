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
                    console.log('status');
                    console.log(status.hunks());
                    status.hunks().then((hunks) => {
                        hunks.forEach((hunk) => {
                            hunk.lines().then((lines) => {
                                console.log('diff', status.oldFile().path(), status.newFile().path());
                                console.log(hunk.header().trim());
                                lines.forEach((line) => {
                                    console.log(String.fromCharCode(line.origin()) + line.content().trim());
                                });
                            });
                        });
                    });

                    return {
                        path: status.path(),
                        changeType: statusToText(status),
                        status: statusText || 'UNKNOWN',
                        isStaged: statusText.split('_')[0] === 'INDEX' ? true : false,
                    } as StatusData;
                }),
            );
        });
    });
}
