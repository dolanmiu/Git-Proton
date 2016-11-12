import { Component, OnInit } from '@angular/core';
import { remote, ipcRenderer } from 'electron';
import * as fs from 'fs';
import { Config } from '../../ipc/config.service';

@Component({
    selector: 'app-open-repo',
    templateUrl: './open-repo.component.html',
    styleUrls: ['./open-repo.component.scss'],
})
export class OpenRepoComponent implements OnInit {
    repos: Array<string>;

    constructor(private config: Config) {
        this.repos = new Array<string>();
    }

    ngOnInit() {

    }

    openDialog() {
        remote.dialog.showOpenDialog({
            properties: ['openDirectory'],
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
                this.repos.push(directory);
                console.log(this.repos);
                ipcRenderer.send('open-repo', directory);
                this.config.writeConfig();

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
