import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
        ]),
    ],
})
export class WorkspaceContainerComponent {
    public getPage(outlet: RouterOutlet): object {
        return outlet.activatedRouteData.page;
    }
}
