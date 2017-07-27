import { Injectable } from '@angular/core';
import { remote } from 'electron';
import 'rxjs/add/observable/bindCallback';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DialogService {

    constructor() { }

    public openDialog(): Observable<string[]> {
        const openDialog = Observable.bindCallback(remote.dialog.showOpenDialog);
        return openDialog({
            properties: ['openDirectory'],
        });
    }

}
