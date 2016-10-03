import {Injectable} from "@angular/core";
import {Credentials} from "../types/Credentials";
import {Http} from "@angular/http";
import {AuthenticationResult} from "../types/AuthenticationResult";
import {Account} from "../types/Account";
import {API_URL, LOCALSTORAGE_AUTH} from "../../configuration";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {
    }

    authenticate(credentials: Credentials): Observable<AuthenticationResult> {
        return this.http.post(`${API_URL}/authentication/login`, credentials).publishReplay(1).refCount().map(resp => resp.json());
    }

    register(account: Account): Observable<AuthenticationResult> {
        return this.http.post(`${API_URL}/authentication/register`, account).publishReplay(1).refCount().map(resp => resp.json());
    }

    checkInitialAuthentication(): AuthenticationResult {
        let item = window.localStorage.getItem(LOCALSTORAGE_AUTH);
        return item ? <AuthenticationResult>JSON.parse(item) : null;
    }
}