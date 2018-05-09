import * as nodegit from 'nodegit';

// This function removes files to staging area (index)
export default function unstage(directory: string, filePaths: string[], fn: (data: StatusData[]) => void): void {
    let index;

    nodegit.Repository.open(directory)
        .then((repo) => {
            return repo.refreshIndex();
        })
        .then((indexResult) => {
            index = indexResult;
        })
        .then(() => {
            return index.removeFall(filePaths);
        })
        .then(() => {
            return index.write();
        })
        .then(() => {
            console.log('written to index');
            return index.writeTree();
        });
}
