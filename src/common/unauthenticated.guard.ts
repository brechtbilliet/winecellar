import {ApplicationState} from "./state/ApplicationState";
import {Store} from "@ngrx/store";
import {CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";
@Injectable()
export class UnauthenticatedGuard implements CanActivate {

    constructor(private store: Store<ApplicationState>) {}

    canActivate() {
        return true;
        // return this.store.take(1).map(state => {
        //     debugger;
        //     return !state.data.authentication.isAuthenticated
        // });
    }
}