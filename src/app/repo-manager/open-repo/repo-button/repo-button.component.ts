import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-repo-button',
    templateUrl: './repo-button.component.html',
    styleUrls: ['./repo-button.component.scss'],
})
export class RepoButtonComponent implements OnInit {
    @Input() public directory: string;
    public projectName: string;
    public parentFolder: string;

    constructor() {}

    public ngOnInit(): void {
        if (!this.directory) {
            console.warn('"directory" is not set as the input!');
            return;
        }
        // this.projectName = path.basename(this.directory);
        // this.parentFolder = path.normalize(`${this.directory}/..`);
    }
}
