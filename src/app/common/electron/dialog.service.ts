import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DialogService {

    constructor() { }

    public openDialog(): Observable<string[]> {
        console.log('Pretending to open dialog');
        return Observable.of([]);
    }

}
