import * as nodegit from 'nodegit';

// tslint:disable-next-line:no-any
export async function pop(directory: string): Promise<any> {
    const repo = await nodegit.Repository.open(directory);
    const result = await nodegit.Stash.pop(repo, 0, null);

    if (result !== 0) {
        throw Error(result);
    }

    let count = 0;

    await nodegit.Stash.foreach(repo, (stashNumber) => {
        count++;
    });

    return count;
}

// tslint:disable-next-line:no-any
export async function stash(directory: string): Promise<number> {
    const repo = await nodegit.Repository.open(directory);
    // const result = await nodegit.Stash.save(repo, repo.defaultSignature(), 'my stash', 0);

    // if (result !== 0) {
    //     throw Error(result);
    // }

    let count = 0;

    const forEachResult = await nodegit.Stash.foreach(repo, (stashNumber) => {
        count++;
    });

    console.log(forEachResult);

    return count;
}
