import { Component, OnInit, OnDestroy, trigger, state, transition, style, animate, Input } from '@angular/core';
//import { dialog } from 'electron';

@Component({
    selector: 'app-repo-manager',
    templateUrl: './repo-manager.component.html',
    //styleUrls: ['./repo-manager.component.scss'],
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
    }

    ngOnDestroy() {
        this.isVisible = false;
        console.log('destroying');
    }

    openDialog() {
        /*dialog.showOpenDialog({
            properties: ['openDirectory']
        });*/
    }
}
