import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { RemoveProjectAction } from 'app/store/projects/projects.actions';

@Component({
    selector: 'app-close-button',
    templateUrl: './close-button.component.html',
    styleUrls: ['./close-button.component.scss'],
})
export class CloseButtonComponent implements OnInit {
    @Input() private projectName: string;

    constructor(private store: Store<AppState>) {}

    public ngOnInit(): void {}

    @HostListener('click', ['$event'])
    public onClick(e: Event): void {
        console.log(e);
        this.store.dispatch(new RemoveProjectAction(this.projectName));
        event.stopPropagation();
    }
}
