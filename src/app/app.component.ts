import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { SettingsService } from 'app/common/electron/settings.service';
import { SetPersistanceAction } from 'app/store/persistance/persistance.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('animRoutes', [
            transition('* <=> *', [
                query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
                group([
                    query(
                        ':enter',
                        [style({ transform: 'translateY(100%)' }), animate('.4s ease-out', style({ transform: 'translateY(0%)' }))],
                        { optional: true },
                    ),
                    query(
                        ':leave',
                        [style({ transform: 'translateY(0%)' }), animate('.4s ease-out', style({ transform: 'translateY(-100%)' }))],
                        { optional: true },
                    ),
                ]),
            ]),
        ]),
    ],
})
export class AppComponent implements OnInit {
    constructor(private settingsService: SettingsService, private store: Store<AppState>) {}

    public getPage(outlet: RouterOutlet): object {
        return outlet.activatedRouteData.page;
    }

    public ngOnInit(): void {
        const data = this.settingsService.getSetting();

        this.store.dispatch(new SetPersistanceAction(data));
    }
}
