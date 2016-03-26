import {Http, Response} from "angular2/http";
import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import * as toastr from "toastr";

import {Credentials} from "../types/Credentials";
import {Account} from "../types/Account";
import {API_URL, DEFAULT_HEADERS, LOCALSTORAGE_AUTH} from "../../config";
import {
    DATA_AUTHENTICATION_SET_AUTHENTICATION, DATA_AUTHENTICATION_CLEAR_AUTHENTICATION, CONTAINER_APPLICATION_DISABLE_BUSY_FLAG,
    CONTAINER_APPLICATION_ENABLE_BUSY_FLAG, DATA_WINES_ADD_ALL
} from "../../common/actionTypes";
import {ApplicationState} from "../../common/state/ApplicationState";
import {AuthenticationResult} from "../types/AuthenticationResult";

@Injectable()
export class AuthenticationEndpoint {
    constructor(private store: Store<ApplicationState>,
                private http: Http) {
    }

    public authenticate(credentials: Credentials): void {
        this.store.dispatch({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        let authentication$: Observable<Response> =
            this.http.post(API_URL + "/authentication/login", JSON.stringify(credentials), {headers: DEFAULT_HEADERS});
        this.handleResult(authentication$);
    }

    public register(account: Account): void {
        this.store.dispatch({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        let authentication$: Observable<Response> =
            this.http.post(API_URL + "/authentication/register", JSON.stringify(account), {headers: DEFAULT_HEADERS});
        this.handleResult(authentication$);
    }

    public handleResult(authentication$: Observable<Response>): void {
        authentication$.map((res: Response) => res.json())
            .subscribe((res: AuthenticationResult) => {
                this.store.dispatch({type: DATA_AUTHENTICATION_SET_AUTHENTICATION, payload: res});
                this.store.dispatch({type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
                window.localStorage.setItem(LOCALSTORAGE_AUTH, JSON.stringify(res));
            }, (res: any) => {
                this.store.dispatch({type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
                toastr.error(res.json().error);
            });
    }

    public logout(): void {
        this.store.dispatch(({type: DATA_AUTHENTICATION_CLEAR_AUTHENTICATION}))
        this.store.dispatch(({type: DATA_WINES_ADD_ALL, payload: []}))
        localStorage.removeItem(LOCALSTORAGE_AUTH);
    }
}