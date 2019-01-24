import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GitgraphCore } from 'gitgraph-core';
import { Observable } from 'rxjs';

import { getCurrentProject } from 'app/store';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    public readonly tree$: Observable<TreeState>;
    public readonly core: GitgraphCore;

    public readonly allCommits$: Observable<GitCommitModel>;

    constructor(readonly store: Store<AppState>) {
        this.tree$ = store.select('tree');

        this.core = new GitgraphCore();
        this.core.template.arrow.size = 1;
        this.core.template.arrow.color = '000';

        this.allCommits$ = store
            .select(getCurrentProject)
            .map((project) => (project ? project.commits : []))
            .flatMap((commits) => commits);
    }

    public ngOnInit(): void {
        setTimeout(() => {
            this.commit();
        }, 1000);
        const master = this.core.branch('master');

        this.allCommits$.subscribe((commits) => {
            master.commit(commits.message);
            console.log(commits);
        });
    }

    public commit(): void {
        // const master = this.core.branch('master').commit('Initial commit');
        // const develop = this.core.branch('develop');
        // develop.commit('one');
        // master.commit('two');
        // develop.commit('three');
        // master.merge(develop);
        // master.commit();
    }
}
