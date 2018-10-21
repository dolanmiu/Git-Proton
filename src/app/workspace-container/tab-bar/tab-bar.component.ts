import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { getProjectsArray } from 'app/store';

interface Tab {
    link: string;
    name: string;
}

@Component({
    selector: 'app-tab-bar',
    templateUrl: './tab-bar.component.html',
    styleUrls: ['./tab-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBarComponent {
    public tabs$: Observable<Tab[]>;
    public selectedTab: Tab;
    public currentTab: Tab;
    public pageState: string;
    @Output() public pageStateChanged: EventEmitter<{}> = new EventEmitter();

    constructor(private location: Location, store: Store<AppState>) {
        this.tabs$ = store.select(getProjectsArray).map((projects) => {
            return projects.map((project) => {
                return {
                    name: project.name,
                    link: project.name,
                };
            });
        });
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
                this.pageStateChanged.emit(this.pageState);
            })
            .subscribe();
    }

    public switchToAdd(): void {
        this.pageState = this.pageState === 'right' ? 'right1' : 'right';
        this.pageStateChanged.emit(this.pageState);
    }
}
