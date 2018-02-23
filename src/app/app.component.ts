import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
export class AppComponent {
    public getPage(outlet: RouterOutlet): object {
        return outlet.activatedRouteData.page;
    }
}
