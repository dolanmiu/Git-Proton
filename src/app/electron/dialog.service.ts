import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    constructor() { }

    public openDialog(): void {
        console.log('Pretending to open dialog');
    }

}
