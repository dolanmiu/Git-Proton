import { Component, OnInit } from '@angular/core';
import { remote, ipcRenderer } from 'electron';

@Component({
    selector: 'app-init-repo',
    templateUrl: './init-repo.component.html',
    styleUrls: ['./init-repo.component.scss'],
})
export class InitRepoComponent implements OnInit {

    ngOnInit() {
    }

    openDialog() {
        remote.dialog.showOpenDialog({
            properties: ['openDirectory'],
        }, data => {
            console.log(data);
            if (data) {
                // this.addGitProject(data[0]);
            }
        });
    }

}
