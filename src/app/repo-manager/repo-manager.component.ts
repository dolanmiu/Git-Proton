import { Component, OnInit, OnDestroy, trigger, state, transition, style, animate, Input } from '@angular/core';
import { remote } from 'electron';
import * as fs from 'fs';
import * as nconf from 'nconf';
import * as path from 'path';

@Component({
    selector: 'app-repo-manager',
    templateUrl: './repo-manager.component.html',
    styleUrls: ['./repo-manager.component.scss'],
    animations: [
        trigger('visibilityChanged', [
            state('true', style({ opacity: 1, transform: 'translateY(0%)' })),
            state('false', style({ opacity: 0, transform: 'translateY(20%)' })),
            transition('* => *', animate('.2s ease-out'))
        ])
    ]
})
export class RepoManagerComponent implements OnInit, OnDestroy {
    @Input() isVisible: boolean;

    ngOnInit() {
        this.isVisible = true;
        //nconf.
    }

    ngOnDestroy() {
        this.isVisible = false;
        console.log('destroying');
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
                return OpenGitStatus.Success;
            } else {
                return OpenGitStatus.NotFound;
            }
        } catch (e) {
            return OpenGitStatus.NotFound;
        }
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
    }
}

enum OpenGitStatus {
    NotFound, Success
}
