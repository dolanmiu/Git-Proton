import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getCurrentProject } from 'app/store';

import { Graph, Rendered } from './core/graph';
import { PathLanePoint } from './core/path-point';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
    private readonly allCommits$: Observable<GitCommitModel[]>;
    public readonly rendered$: Observable<Rendered>;

    constructor(readonly store: Store<AppState>) {
        this.allCommits$ = store
            .select(getCurrentProject)
            .map((project) => (project ? project.commits : []))
            .flatMap((commits) => commits)
            .take(100)
            .toArray();

        this.rendered$ = this.allCommits$
            .map((commits) => Graph.of(commits).render())
            .do((renderered) => console.log(renderered.FullPaths));
    }

    public ngOnInit(): void {}

    public getEndPosition(path: PathLanePoint[], index: number): PathLanePoint {
        const point = path[index];

        const nextPoint: PathLanePoint | undefined = path[index + 1];

        const parentPoint = nextPoint ? nextPoint : point;

        return parentPoint;
    }

    public getColor(i: number): string {
        return '#' + Math.floor(Math.sin(i) * 16777215).toString(16);
    }
}
