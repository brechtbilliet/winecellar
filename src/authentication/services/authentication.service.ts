import {Injectable} from "@angular/core";
import {Credentials} from "../types/Credentials";
import {Response, Http} from "@angular/http";
import {AuthenticationResult} from "../types/AuthenticationResult";
import {Account} from "../types/Account";
import {API_URL, LOCALSTORAGE_AUTH} from "../../configuration";
import * as toastr from "toastr";
import {ApplicationState} from "../../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Rx";
import {clearAuthentication, setAuthentication} from "../../statemanagement/actionCreators";
@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private store: Store<ApplicationState>) {
    }

    authenticate(credentials: Credentials): Observable<AuthenticationResult> {
        return this.handleAuthenticationResult(
            this.http.post(`${API_URL}/authentication/login`, credentials).publishReplay(1).refCount().map(resp => resp.json())
        );
    }

    register(account: Account): Observable<AuthenticationResult> {
        return this.handleAuthenticationResult(
            this.http.post(`${API_URL}/authentication/register`, account).publishReplay(1).refCount().map(resp => resp.json())
        );
    }

    logout(): void {
        localStorage.removeItem(LOCALSTORAGE_AUTH);
        this.store.dispatch(clearAuthentication());
    }

    checkInitialAuthentication(): void {
        let localStorageObj = window.localStorage.getItem(LOCALSTORAGE_AUTH);
        if (localStorageObj) {
            // evil fix for bug in @ngrx/dev-tools
            // https://github.com/ngrx/store-devtools/issues/25
            setTimeout(() => {
                this.store.dispatch(setAuthentication(JSON.parse(localStorageObj)));
            });
        }
    }

    private handleAuthenticationResult(obs$: Observable<AuthenticationResult>): Observable<AuthenticationResult> {
        obs$.subscribe((result: AuthenticationResult) => {
                window.localStorage.setItem(LOCALSTORAGE_AUTH, JSON.stringify(result));
                this.store.dispatch(setAuthentication(result));
                toastr.success("successfully logged in!");
            }, (errorResponse: Response) => {
                toastr.error(errorResponse.json().error);
            });
        return obs$;
    }
}