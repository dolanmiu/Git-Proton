// References is another word for branches
import * as nodegit from 'nodegit';

export async function getReferences(directory: string): Promise<ReferenceData[]> {
    const repo = await nodegit.Repository.open(directory);
    const references = await repo.getReferences(nodegit.Reference.TYPE.LISTALL);

    return references.map((reference) => {
        return mapReference(reference);
    });
}

export async function branch(directory: string, referenceName: string): Promise<ReferenceData> {
    const repo = await nodegit.Repository.open(directory);

    const commit = await repo.getHeadCommit();
    const reference = await repo.createBranch(referenceName, commit, false);
    return mapReference(reference);
}

export async function checkoutBranch(directory: string, referenceName: string): Promise<void> {
    const repo = await nodegit.Repository.open(directory);

    await repo.checkoutBranch(referenceName);
    return;
}

// tslint:disable-next-line:no-any
function mapReference(reference: any): ReferenceData {
    return {
        name: reference.name(),
        isBranch: !!reference.isBranch(),
        isConcrete: !!reference.isConcrete(),
        isHead: !!reference.isHead(),
        isNote: !!reference.isNote(),
        isRemote: !!reference.isRemote(),
        isSymbolic: !!reference.isSymbolic(),
        isTag: !!reference.isTag(),
    } as ReferenceData;
}
