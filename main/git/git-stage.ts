import * as nodegit from 'nodegit';

// This function adds files to staging area (index)
export default function stage(directory: string, filePaths: string[], fn: (data: StatusData[]) => void): void {
    let index;

    nodegit.Repository.open(directory)
        .then((repo) => {
            return repo.refreshIndex();
        })
        .then((indexResult) => {
            index = indexResult;
        })
        .then(() => {
            // this file is in the root of the directory and doesn't need a full path
            return index.addAll(filePaths);
        })
        .then(() => {
            // this will write both files to the index
            return index.write();
        })
        .then(() => {
            console.log('written to index');
            return index.writeTree();
        });
}
