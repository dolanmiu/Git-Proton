import { Graph } from './graph';
import { PointType } from './path-point';

const commits: GitCommitModel[] = [
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

describe('Graph', () => {
    it('Should not render more than 1 node per row', () => {
        const graph = Graph.of(commits);
        const rendered = graph.render();

        rendered.Rows.forEach((row) => {
            const nodes = row.filter((item) => item.type === PointType.NODE);

            expect(nodes.length).toEqual(1);
        });
    });
});
