import * as nodegit from 'nodegit';

// This code shows working directory changes similar to git status
export default function walk(directory: string, fn: (data: StatusData[]) => void): void {
    nodegit.Repository.open(directory).then((repo) => {
        repo.getStatus().then((statuses) => {
            // tslint:disable-next-line:no-any
            function statusToText(status: any): string {
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
            }

            statuses.forEach((file) => {
                console.log(file.path() + ' ' + statusToText(file));
            });

            fn(
                statuses.map((status) => {
                    return {
                        path: status.path(),
                        status: statusToText(status),
                    };
                }),
            );
        });
    });
}
