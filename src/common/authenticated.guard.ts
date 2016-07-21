import {ApplicationState} from "./state/ApplicationState";
import {Store} from "@ngrx/store";
import {CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";
@Injectable()
export class AuthenticatedGuard implements CanActivate {

    constructor(private store: Store<ApplicationState>) {}

    canActivate() {
        return this.store.take(1).map(state => state.data.authentication.isAuthenticated);
    }
}