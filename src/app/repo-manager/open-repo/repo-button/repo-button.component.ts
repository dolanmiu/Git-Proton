import { Component, OnInit, Input } from '@angular/core';
import * as path from 'path';

@Component({
    selector: 'app-repo-button',
    templateUrl: './repo-button.component.html',
    styleUrls: ['./repo-button.component.scss']
})
export class RepoButtonComponent implements OnInit {
    @Input() directory: string
    projectName: string;
    parentFolder: string;

    constructor() {
    }

    ngOnInit() {
        if (!this.directory) {
            console.warn('"directory" is not set as the input!');
            return;
        }
        this.projectName = path.basename(this.directory);
        this.parentFolder = path.normalize(`${this.directory}/..`);
    }

}
