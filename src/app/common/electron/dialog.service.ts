import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const DIALOGS = [{ path: '', name: 'First Project' }, { path: '', name: 'Second Project' }, { path: '', name: 'Third Project' }];

@Injectable()
export class DialogService {
    private accessCounter: number;

    constructor() {
        this.accessCounter = 0;
    }

    public openDialog(): Observable<{ path: string; name: string }> {
        console.log('Pretending to open dialog');
        const observable$ = Observable.of(DIALOGS[this.accessCounter]);
        this.accessCounter++;

        return observable$;
    }
}
