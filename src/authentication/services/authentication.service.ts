import {Injectable} from "@angular/core";
import {Credentials} from "../types/Credentials";
import {Response, Http, RequestOptionsArgs, Headers, RequestOptions} from "@angular/http";
import {AuthenticationResult} from "../types/AuthenticationResult";
import {Account} from "../types/Account";
import {API_URL, LOCALSTORAGE_AUTH} from "../../configuration";
import * as toastr from "toastr";
import {ApplicationState} from "../../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";
import {BusyHandlerService} from "../../common/services/busyHandler.service";
import {Observable} from "rxjs/Rx";
import {clearAuthentication, setAuthentication} from "../../statemanagement/actionCreators";
@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private store: Store<ApplicationState>, private busyHandlerService: BusyHandlerService) {
    }

    authenticate(credentials: Credentials): Observable<AuthenticationResult> {
        return this.handleAuthenticationResult(
            this.http.post(`${API_URL}/authentication/login`, credentials).share().map(resp => resp.json())
        );
    }

    register(account: Account): Observable<AuthenticationResult> {
        return this.handleAuthenticationResult(
            this.http.post(`${API_URL}/authentication/register`, account).share().map(resp => resp.json())
        );
    }

    logout(): void {
        localStorage.removeItem(LOCALSTORAGE_AUTH);
        this.store.dispatch(clearAuthentication());
    }

    checkInitialAuthentication(): void {
        let localStorageObj = window.localStorage.getItem(LOCALSTORAGE_AUTH);
        if (localStorageObj) {
            this.store.dispatch(setAuthentication(JSON.parse(localStorageObj)));
        }
    }

    private handleAuthenticationResult(obs$: Observable<AuthenticationResult>): Observable<AuthenticationResult> {
        this.busyHandlerService.handle(obs$);
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