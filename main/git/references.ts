// References is another word for branches
import * as nodegit from 'nodegit';

export default function getReferences(directory: string, fn: (data: ReferenceData[]) => void): void {
    nodegit.Repository.open(directory).then((repo) => {
        repo.getReferences(nodegit.Reference.TYPE.LISTALL).then((references) => {
            fn(
                references.map((reference) => {
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
                }),
            );
        });
    });
}
