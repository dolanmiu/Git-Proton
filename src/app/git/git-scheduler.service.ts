import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getUnselectedProjectsArray, StartFetchAction } from 'app/store';

@Injectable()
export class GitSchedulerService {
    constructor(
        private store: Store<AppState>,
    ) {}

    public start(): void {
        Observable.interval(10000)
            .switchMap(() => this.store.select(getUnselectedProjectsArray).take(1))
            .flatMap((arr) => arr)
            .do(() => {
                this.poll();
            })
            .subscribe();

        Observable.interval(10000)
            .do(() => {
                this.poll();
            })
            .subscribe();
    }

    private poll(): void {
        // this.statusService.getStatus(project);
        this.store.dispatch(new StartFetchAction());
    }
}
