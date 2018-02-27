import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';

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
    public tabs: Tab[] = [
        {
            name: 'hey',
            link: 'a',
        },
        {
            name: 'sister',
            link: 'b',
        },
        {
            name: 'soul',
            link: 'c',
        },
    ];
    @ViewChild('appOutlet') public appOutlet: RouterOutlet;
    public selectedTab: Tab;
    public currentTab: Tab;
    public pageState: string;

    constructor(private location: Location, router: Router) {
        console.log(router.config);
        router.config[1].children.splice(1, 0, { path: 'a', component: WorkspaceComponent });
        router.config[1].children.splice(1, 0, { path: 'b', component: WorkspaceComponent });
        router.config[1].children.splice(1, 0, { path: 'c', component: WorkspaceComponent });
    }

    public getPage(outlet: RouterOutlet): void {
        const selectedTabIndex = this.tabs.indexOf(this.selectedTab);
        const workspaceName = this.location
            .path()
            .split('/')
            .slice(-1)[0];

        this.currentTab = this.tabs.find((x) => x.link === workspaceName);
        const currentTabIndex = this.tabs.indexOf(this.currentTab);

        if (selectedTabIndex <= currentTabIndex) {
            this.pageState = this.pageState === 'left' ? 'left1' : 'left';
        } else {
            this.pageState = this.pageState === 'right' ? 'right1' : 'right';
        }
    }

    public switchTab(tab: Tab): void {
        this.selectedTab = tab;
        this.getPage(this.appOutlet);
    }
}
