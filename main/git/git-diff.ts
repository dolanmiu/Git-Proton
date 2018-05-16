import * as nodegit from 'nodegit';

// This function finds the diff. Similar to 'git show'
export default function diff(directory: string, fn: (data: StatusData[]) => void): void {
    nodegit.Repository.open(directory)
        .then((repo) => {
            return nodegit.Diff.indexToWorkdir(repo, null, {});
        })
        .then((currentDiff) => {
            currentDiff.patches().then((patches) => {
                patches.forEach((patch) => {
                    patch.hunks().then((hunks) => {
                        hunks.forEach((hunk) => {
                            hunk.lines().then((lines) => {
                                console.log('diff', patch.oldFile().path(), patch.newFile().path());
                                console.log(hunk.header().trim());
                                lines.forEach((line) => {
                                    console.log(String.fromCharCode(line.origin()) + line.content().trim());
                                });
                            });
                        });
                    });
                });
            });
        });
}
