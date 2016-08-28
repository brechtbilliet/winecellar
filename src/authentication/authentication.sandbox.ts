import {Injectable} from "@angular/core";
import {Credentials} from "./types/Credentials";
import {Account} from "./types/Account";
import {AuthenticationService} from "./services/authentication.service";
import {AuthenticationResult} from "./types/AuthenticationResult";
import {Observable} from "rxjs/Rx";
import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";

@Injectable()
export class AuthenticationSandbox {
    isBusy$ = this.store.select(state => state.containers.application.isBusy);

    constructor(private authenticationService: AuthenticationService, private store: Store<ApplicationState>) {
    }

    login(credentials: Credentials): Observable<AuthenticationResult> {
        return this.authenticationService.authenticate(credentials);
    }

    register(account: Account): Observable<AuthenticationResult> {
        return this.authenticationService.register(account);
    }
}