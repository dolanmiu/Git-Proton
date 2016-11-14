import { Component, OnInit } from '@angular/core';
import { remote, ipcRenderer } from 'electron';

@Component({
    selector: 'app-clone-repo',
    templateUrl: './clone-repo.component.html',
    styleUrls: ['./clone-repo.component.scss'],
})
export class CloneRepoComponent implements OnInit {

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
