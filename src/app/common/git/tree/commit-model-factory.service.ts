import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { CommitModel } from './commit-model';

@Injectable()
export class CommitModelFactoryService {
    constructor() {}

    public create(commits: GitCommitModel[]): CommitModel[] {
        const map = this.createCommitMap(commits);
        const newCommits: CommitModel[] = [];

        for (const key in map) {
            if (map[key] === undefined) {
                continue;
            }
            const commit = map[key];

            for (const sha of commit.sha.parents) {
                const parent = map[sha];
                commit.parents.push(parent);
                commit.commit.date = new Date(commit.commit.date);
            }

            newCommits.push(commit);
        }

        return newCommits;
    }

    private createCommitMap(commits: GitCommitModel[]): { [key: string]: CommitModel } {
        const map: { [key: string]: CommitModel } = {};

        commits = _.cloneDeep(commits);

        for (const commit of commits) {
            map[commit.sha.current] = new CommitModel(commit);
        }

        return map;
    }
}
