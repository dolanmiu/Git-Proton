import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';

import { DialogService } from 'app/common/electron/dialog.service';
import { GitService } from 'app/common/git/git.service';

@Component({
    selector: 'app-open-repo',
    templateUrl: './open-repo.component.html',
    styleUrls: ['./open-repo.component.scss'],
})
export class OpenRepoComponent implements OnInit {

    constructor(private dialogService: DialogService, private gitService: GitService) {
        console.log(this.gitService.addGitProject);
    }

    public ngOnInit(): void {
    }

    public openDialog(): void {
        this.dialogService.openDialog().flatMap((data) => {
            console.log(data);
            return this.gitService.addGitProject(data[0]);
        }).subscribe();
        // remote.dialog.showOpenDialog({
        //     properties: ['openDirectory'],
        // }, (data) => {
        //     console.log(data);
        //     if (data) {
        //         // this.addGitProject(data[0]);
        //     }
        // });
    }

    // private addGitProject(directory: string): OpenGitStatus {
    //     try {
    //         let stats = fs.statSync(`${directory}/.git`);

    //         if (stats.isDirectory()) {
    //             console.log(stats);
    //             console.log(this.repos);

    //             /*Git.Repository.open('test');

    //             ipcRenderer.send('open-repo', directory);
    //             this.config.writeConfig(directory);
    //             return OpenGitStatus.Success;*/
    //         } else {
    //             return OpenGitStatus.NotFound;
    //         }
    //     } catch (e) {
    //         return OpenGitStatus.NotFound;
    //     }
    // }
}
