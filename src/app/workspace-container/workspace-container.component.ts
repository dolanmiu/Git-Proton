import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Tab {
    link: string;
    name: string;
}

@Component({
    selector: 'app-workspace-container',
    templateUrl: './workspace-container.component.html',
    styleUrls: ['./workspace-container.component.scss'],
    animations: [
        trigger('animRoutes', [
            transition('* <=> *', [
                query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
                group([
                    query(
                        ':enter',
                        [style({ transform: 'translateX(100%)' }), animate('.6s ease-out', style({ transform: 'translateX(0%)' }))],
                        { optional: true },
                    ),
                    query(
                        ':leave',
                        [style({ transform: 'translateX(0%)' }), animate('.6s ease-out', style({ transform: 'translateX(-100%)' }))],
                        { optional: true },
                    ),
                ]),
            ]),

            transition('left => *', [
                query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
                group([
                    query(
                        ':enter',
                        [style({ transform: 'translateX(-100%)' }), animate('.6s ease-out', style({ transform: 'translateX(0%)' }))],
                        { optional: true },
                    ),
                    query(
                        ':leave',
                        [style({ transform: 'translateX(0%)' }), animate('.6s ease-out', style({ transform: 'translateX(100%)' }))],
                        { optional: true },
                    ),
                ]),
            ]),
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

    constructor(private location: Location) {}

    public getPage(outlet: RouterOutlet): void {
        const selectedTabIndex = this.tabs.indexOf(this.selectedTab);
        const workspaceName = this.location
            .path()
            .split('/')
            .slice(-1)[0];
        console.log(this.currentTab);
        const currentTabIndex = this.tabs.indexOf(this.currentTab);

        this.currentTab = this.tabs.find((x) => {
            return x.link === workspaceName;
        });

        if (selectedTabIndex <= currentTabIndex) {
            this.pageState = 'left';
        } else {
            this.pageState = 'right';
        }
    }

    public switchTab(tab: Tab): void {
        this.selectedTab = tab;
        this.getPage(this.appOutlet);
    }
}
