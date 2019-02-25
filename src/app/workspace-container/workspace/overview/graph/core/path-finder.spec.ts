import { PathFinder } from './path-finder';
import { PointType } from './path-point';

const linearCommits: GitCommitModel[] = [
    {
        author: {
            email: 'dolan_miu@hotmail.com',
            name: 'Dolan',
        },
        committer: {
            email: 'noreply@github.com',
            name: 'GitHub',
        },
        date: new Date('2019-02-09T17:43:43.000Z'),
        message: 'Merge pull request #265 from joefitter/bugfix/conditional-coverage\n\ndont run coverage if publishing',
        sha: {
            current: 'd1bdbd397a42bae92158b9c87d50363f01895d9c',
            parents: ['83a7f4664dd232d332781e4b6284d2a7c46b0ae7'],
        },
    },
    {
        author: {
            email: 'dolan_miu@hotmail.com',
            name: 'Dolan',
        },
        committer: {
            email: 'noreply@github.com',
            name: 'GitHub',
        },
        date: new Date('2019-01-28T13:04:51.000Z'),
        message: 'Update tslint.json',
        sha: {
            current: '83a7f4664dd232d332781e4b6284d2a7c46b0ae7',
            parents: ['728aefc4a71c909f8ef9742eeb2f380c5e292b96'],
        },
    },
    {
        author: {
            email: 'dolan_miu@hotmail.com',
            name: 'Dolan',
        },
        committer: {
            email: 'noreply@github.com',
            name: 'GitHub',
        },
        date: new Date('2019-01-24T00:16:08.000Z'),
        message: 'Merge pull request #256 from dolanmiu/feat/webpack-ts\n\nUse a typescript webpack config',
        sha: {
            current: '728aefc4a71c909f8ef9742eeb2f380c5e292b96',
            parents: ['40730548bb958c66e1440b993ff9ebe5a050d579'],
        },
    },
    {
        author: {
            email: 'dolan_miu@hotmail.com',
            name: 'Dolan',
        },
        committer: {
            email: 'dolan_miu@hotmail.com',
            name: 'Dolan',
        },
        date: new Date('2019-01-23T20:09:32.000Z'),
        message: 'Add webpack type definitions\n',
        sha: {
            current: '40730548bb958c66e1440b993ff9ebe5a050d579',
            parents: ['b22f565dd00652dd051947d83a420264b076aba0'],
        },
    },
    {
        author: {
            email: 'dolan_miu@hotmail.com',
            name: 'Dolan',
        },
        committer: {
            email: 'dolan_miu@hotmail.com',
            name: 'Dolan',
        },
        date: new Date('2019-01-23T20:09:32.000Z'),
        message: 'Add webpack type definitions\n',
        sha: {
            current: 'b22f565dd00652dd051947d83a420264b076aba0',
            parents: ['b22f565dd00652dd051947d83a420264b076aba1'],
        },
    },
];

const multiParentCommits: GitCommitModel[] = [
    {
        author: {
            email: 'dolan_miu@hotmail.com',
            name: 'Dolan',
        },
        committer: {
            email: 'noreply@github.com',
            name: 'GitHub',
        },
        date: new Date('2019-02-09T17:43:43.000Z'),
        message: 'Merge pull request #265 from joefitter/bugfix/conditional-coverage\n\ndont run coverage if publishing',
        sha: {
            current: 'd1bdbd397a42bae92158b9c87d50363f01895d9c',
            parents: ['83a7f4664dd232d332781e4b6284d2a7c46b0ae7', 'a6077b8f163ff40567c048198d246d023a95705d'],
        },
    },
    {
        author: {
            email: 'joefitter@hotmail.com',
            name: 'Joe Fitter',
        },
        committer: {
            email: 'joefitter@hotmail.com',
            name: 'Joe Fitter',
        },
        date: new Date('2019-02-08T12:06:50.000Z'),
        message: 'dont run coverage if publishing\n',
        sha: {
            current: 'a6077b8f163ff40567c048198d246d023a95705d',
            parents: ['83a7f4664dd232d332781e4b6284d2a7c46b0ae7'],
        },
    },
    {
        author: {
            email: 'dolan_miu@hotmail.com',
            name: 'Dolan',
        },
        committer: {
            email: 'noreply@github.com',
            name: 'GitHub',
        },
        date: new Date('2019-01-28T13:04:51.000Z'),
        message: 'Update tslint.json',
        sha: {
            current: '83a7f4664dd232d332781e4b6284d2a7c46b0ae7',
            parents: ['728aefc4a71c909f8ef9742eeb2f380c5e292b96'],
        },
    },
    {
        author: {
            email: 'dolan_miu@hotmail.com',
            name: 'Dolan',
        },
        committer: {
            email: 'noreply@github.com',
            name: 'GitHub',
        },
        date: new Date('2019-01-24T00:16:08.000Z'),
        message: 'Merge pull request #256 from dolanmiu/feat/webpack-ts\n\nUse a typescript webpack config',
        sha: {
            current: '728aefc4a71c909f8ef9742eeb2f380c5e292b96',
            parents: ['d6c2c967576cdceaa9ea7590874f930db2f37478', '40730548bb958c66e1440b993ff9ebe5a050d579'],
        },
    },
    {
        author: {
            email: 'dolan_miu@hotmail.com',
            name: 'Dolan',
        },
        committer: {
            email: 'dolan_miu@hotmail.com',
            name: 'Dolan',
        },
        date: new Date('2019-01-23T20:09:32.000Z'),
        message: 'Add webpack type definitions\n',
        sha: {
            current: '40730548bb958c66e1440b993ff9ebe5a050d579',
            parents: ['b22f565dd00652dd051947d83a420264b076aba0'],
        },
    },
];

describe('PathFinder', () => {
    it('should work out a correct path for 5 elements', () => {
        const pathResult = PathFinder.find(linearCommits, new Map<string, boolean>(), linearCommits[0]);

        expect(pathResult.start.sha).toEqual(linearCommits[0].sha.current);
        expect(pathResult.start.type).toEqual(PointType.NODE);
        expect(pathResult.intermediate.length).toEqual(3);
        pathResult.intermediate.forEach((inter) => {
            expect(inter.type).toEqual(PointType.NODE);
        });
        expect(pathResult.end!.sha).toEqual(linearCommits[linearCommits.length - 1].sha.current);
        expect(pathResult.total.length).toEqual(5);
        expect(pathResult.total.slice().sort()).toEqual(pathResult.total);
    });

    it('should work out a correct path for 3 elements', () => {
        const newCommits = linearCommits.slice(0, 3);
        const pathResult = PathFinder.find(newCommits, new Map<string, boolean>(), newCommits[0]);

        expect(pathResult.start.sha).toEqual(newCommits[0].sha.current);
        expect(pathResult.intermediate.length).toEqual(1);
        expect(pathResult.end!.sha).toEqual(newCommits[newCommits.length - 1].sha.current);
        expect(pathResult.total.length).toEqual(3);
        expect(pathResult.total.slice().sort()).toEqual(pathResult.total);
    });

    it('should work out a correct path for 2 elements', () => {
        const newCommits = linearCommits.slice(0, 2);
        const pathResult = PathFinder.find(newCommits, new Map<string, boolean>(), newCommits[0]);

        expect(pathResult.start.sha).toEqual(newCommits[0].sha.current);
        expect(pathResult.intermediate.length).toEqual(0);
        expect(pathResult.end!.sha).toEqual(newCommits[newCommits.length - 1].sha.current);
        expect(pathResult.total.length).toEqual(2);
    });

    it('should work out a correct path for 3 elements', () => {
        const newCommits = linearCommits.slice(0, 4);
        const pathResult = PathFinder.find(newCommits, new Map<string, boolean>(), newCommits[1]);

        expect(pathResult.start.sha).toEqual(newCommits[1].sha.current);
        expect(pathResult.intermediate.length).toEqual(1);
        expect(pathResult.end!.sha).toEqual(newCommits[newCommits.length - 1].sha.current);
        expect(pathResult.total.length).toEqual(3);
    });

    it('should work out a correct path for 3 elements', () => {
        const newCommits = linearCommits.slice(1, 4);
        const pathResult = PathFinder.find(newCommits, new Map<string, boolean>(), newCommits[0]);

        expect(pathResult.start.sha).toEqual(newCommits[0].sha.current);
        expect(pathResult.intermediate.length).toEqual(1);
        expect(pathResult.end!.sha).toEqual(newCommits[newCommits.length - 1].sha.current);
        expect(pathResult.total.length).toEqual(3);
    });

    it('should work out a correct path for 1 element', () => {
        const newCommits = linearCommits.slice(0, 1);
        const pathResult = PathFinder.find(newCommits, new Map<string, boolean>(), newCommits[0]);

        expect(pathResult.start.sha).toEqual(newCommits[0].sha.current);
        expect(pathResult.intermediate.length).toEqual(0);
        expect(pathResult.end.sha).toEqual(newCommits[0].sha.current);
        expect(pathResult.total.length).toEqual(1);
    });

    it('should work out a correct path for 5 elements for the shortest route', () => {
        const pathResult = PathFinder.find(multiParentCommits, new Map<string, boolean>(), multiParentCommits[0]);

        expect(pathResult.start.sha).toEqual(multiParentCommits[0].sha.current);
        expect(pathResult.start.type).toEqual(PointType.NODE);
        expect(pathResult.intermediate.length).toEqual(2);
        expect(pathResult.end!.sha).toEqual(multiParentCommits[multiParentCommits.length - 1].sha.current);
        expect(pathResult.total.slice().sort()).toEqual(pathResult.total);
    });
});
