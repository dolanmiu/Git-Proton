import { Injectable } from '@angular/core';
import { remote } from 'electron';
import * as path from 'path';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DialogService {
    constructor() {}

    public openDialog(): Observable<{ path: string; name: string }> {
        const openDialog = Observable.bindCallback(remote.dialog.showOpenDialog);
        return openDialog({
            properties: ['openDirectory'],
        }).switchMap((directories) => {
            if (directories.length === 0) {
                return Observable.empty();
            }

            const fullPath = directories[0];
            const projectName = path.basename(fullPath);

            return Observable.of({ path: fullPath, name: projectName });
        });
    }
}
