import {Injectable} from "@angular/core";
import {Credentials} from "../types/Credentials";
import {Account} from "../types/Account";
import {AuthenticationService} from "../services/authentication.service";
import {AuthenticationResult} from "../types/AuthenticationResult";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthenticationSandbox {
    constructor(private authenticationService: AuthenticationService) {
    }

    login(credentials: Credentials): Observable<AuthenticationResult> {
        return this.authenticationService.authenticate(credentials);
    }

    register(account: Account): Observable<AuthenticationResult> {
        return this.authenticationService.register(account);
    }
}