import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
    public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const { url } = routerState;
        const { queryParams } = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;

        while (state.firstChild) {
            state = state.firstChild;
        }

        const { params } = state;
        const workspaceName = url
            .split('/')
            .splice(-1)[0]
            .replace(/%20/g, ' ');

        return { url, queryParams, params, workspaceName };
    }
}
