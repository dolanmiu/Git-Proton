import { Injectable } from '@angular/core';
import { remote } from 'electron';

@Injectable()
export class DialogService {

    constructor() { }

    public openDialog(): void {
        remote.dialog.showOpenDialog({
            properties: ['openDirectory'],
        }, (data) => {
            console.log(data);
            if (data) {
                // this.addGitProject(data[0]);
            }
        });
    }

}
