import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

interface Tab {
    link: string;
    name: string;
}

const left = [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
        query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
            optional: true,
        }),
        query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
            optional: true,
        }),
    ]),
];

const right = [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
        query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
            optional: true,
        }),
        query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
            optional: true,
        }),
    ]),
];

@Component({
    selector: 'app-workspace-container',
    templateUrl: './workspace-container.component.html',
    styleUrls: ['./workspace-container.component.scss'],
    animations: [
        trigger('animRoutes', [
            transition('* => right', right),
            transition('* => left', left),
            transition('* => right1', right),
            transition('* => left1', left),
        ]),
    ],
})
export class WorkspaceContainerComponent {
    public tabs$: Observable<Tab[]>;

    public selectedTab: Tab;
    public currentTab: Tab;
    public pageState: string;

    constructor(private location: Location, store: Store<AppState>) {
        this.tabs$ = store
            .select('projects')
            .map((project) => {
                return Object.keys(project).map((i) => project[i]);
            })
            .flatMap((projects) => projects)
            .map((project) => {
                return {
                    name: project.name,
                    link: project.name,
                };
            })
            .zip();
    }

    public switchTab(tab: Tab): void {
        this.selectedTab = tab;
        this.tabs$
            .do((tabs) => {
                const selectedTabIndex = tabs.indexOf(this.selectedTab);
                const workspaceName = this.location
                    .path()
                    .split('/')
                    .slice(-1)[0];

                this.currentTab = tabs.find((x) => x.link === workspaceName);
                const currentTabIndex = tabs.indexOf(this.currentTab);

                if (selectedTabIndex <= currentTabIndex) {
                    this.pageState = this.pageState === 'left' ? 'left1' : 'left';
                } else {
                    this.pageState = this.pageState === 'right' ? 'right1' : 'right';
                }
            })
            .subscribe();
    }
}
