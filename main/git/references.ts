// References is another word for branches
import * as nodegit from 'nodegit';

export default async function getReferences(directory: string): Promise<ReferenceData[]> {
    const repo = await nodegit.Repository.open(directory);
    const references = await repo.getReferences(nodegit.Reference.TYPE.LISTALL);

    return references.map((reference) => {
        return {
            reference: reference.name(),
            isBranch: !!reference.isBranch(),
            isConcrete: !!reference.isConcrete(),
            isHead: !!reference.isHead(),
            isNote: !!reference.isNote(),
            isRemote: !!reference.isRemote(),
            isSymbolic: !!reference.isSymbolic(),
            isTag: !!reference.isTag(),
        } as ReferenceData;
    });
}
