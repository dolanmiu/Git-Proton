import { Component, OnInit } from '@angular/core';
// import { remote } from 'electron';

@Component({
    selector: 'app-open-repo',
    templateUrl: './open-repo.component.html',
    styleUrls: ['./open-repo.component.scss'],
})
export class OpenRepoComponent implements OnInit {

    constructor() {
    }

    public ngOnInit(): void {
    }

    public openDialog(): void {
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
