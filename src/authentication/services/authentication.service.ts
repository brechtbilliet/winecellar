import {Injectable} from "@angular/core";
import {Credentials} from "../types/Credentials";
import {Response, Http, RequestOptionsArgs, Headers, RequestOptions} from "@angular/http";
import {AuthenticationResult} from "../types/AuthenticationResult";
import {Account} from "../types/Account";
import {API_URL, LOCALSTORAGE_AUTH} from "../../configuration";
import * as toastr from "toastr";
import {ApplicationState} from "../../common/state/ApplicationState";
import {Store} from "@ngrx/store";
import {BusyHandlerService} from "../../common/services/busyHandler.service";
import {Observable} from "rxjs/Rx";
import {clearAuthentication, setAuthentication} from "../../common/actionCreators";
@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private store: Store<ApplicationState>, private busyHandlerService: BusyHandlerService) {
    }

    authenticate(credentials: Credentials): void {
        this.handleAuthenticationResult(
            this.http.post(API_URL + "/authentication/login", JSON.stringify(credentials), this.postPutHttpOptions())
        );
    }

    register(account: Account): void {
        this.handleAuthenticationResult(
            this.http.post(API_URL + "/authentication/register", JSON.stringify(account), this.postPutHttpOptions())
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

    private handleAuthenticationResult(obs$: Observable<Response>): void {
        this.busyHandlerService.handle(obs$).map(resp => resp.json()).subscribe((result: AuthenticationResult) => {
            window.localStorage.setItem(LOCALSTORAGE_AUTH, JSON.stringify(result));
            this.store.dispatch(setAuthentication(result));
            toastr.success("successfully logged in!");
        }, (errorResponse: Response) => {
            toastr.error(errorResponse.json().error);
        });
    }

    private postPutHttpOptions(): RequestOptionsArgs {
        let headers = new Headers({
            "Content-Type": "application/json"
        });
        return new RequestOptions({ headers: headers });
    }

}