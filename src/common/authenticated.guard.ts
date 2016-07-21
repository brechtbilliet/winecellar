import {ApplicationState} from "./state/ApplicationState";
import {Store} from "@ngrx/store";
import {CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthenticatedGuard implements CanActivate {

    constructor(private store: Store<ApplicationState>) {}

    canActivate() {
        let state: ApplicationState;
        this.store.take(1).subscribe(s => state = s);
        return state.data.authentication.isAuthenticated;
    }
}