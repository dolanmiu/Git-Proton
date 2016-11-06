import { Component, OnInit } from '@angular/core';
import { remote, ipcRenderer } from 'electron';
import * as fs from 'fs';
import * as nconf from 'nconf';
import * as path from 'path';

@Component({
    selector: 'app-open-repo',
    templateUrl: './open-repo.component.html',
    styleUrls: ['./open-repo.component.scss']
})
export class OpenRepoComponent implements OnInit {
    repos: Array<string>;

    constructor() {
        this.repos = new Array<string>();
    }

    ngOnInit() {

    }

    openDialog() {
        remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        }, data => {
            console.log(data);
            if (data) {
                this.addGitProject(data[0]);
            }
        });
    }

    private addGitProject(directory: string): OpenGitStatus {
        try {
            let stats = fs.statSync(`${directory}/.git`);

            if (stats.isDirectory()) {
                console.log(stats);
                /*nconf.argv().env();
                nconf.file('projects', { file: 'configuration/projects.json' });

                nconf.set(path.basename(directory), {
                    directory
                });

                nconf.save('projects', err => {
                    fs.readFile('configuration/projects.json', (err, data) => {
                        console.dir(JSON.parse(data.toString()))
                    });
                });*/
                this.repos.push(directory);
                console.log(this.repos);
                ipcRenderer.send('open-repo', directory);

                return OpenGitStatus.Success;
            } else {
                return OpenGitStatus.NotFound;
            }
        } catch (e) {
            return OpenGitStatus.NotFound;
        }
    }
}

enum OpenGitStatus {
    NotFound, Success
}
