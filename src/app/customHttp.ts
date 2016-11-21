import {Injectable} from "@angular/core";
import {
    Http, RequestOptionsArgs, RequestOptions, ConnectionBackend, Request, Response,
    XHRBackend
} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {DisableBusyFlag, EnableBusyFlag} from "../statemanagement/actions/containers/application";
@Injectable()
export class CustomHttp extends Http {
    private activeCalls: number;
    private store: Store<ApplicationState>;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, store: Store<ApplicationState>) {
        super(backend, defaultOptions);
        this.store = store;
        this.activeCalls = 0;
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.httpCallRequested();

        return super.get(url, options).finally(
            () => {
                this.httpCallReady();
            }
        );
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        this.httpCallRequested();
        return super.request(url, options).finally(
            () => {
                this.httpCallReady();
            }
        );
    };

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        this.httpCallRequested();
        return super.post(url, body, options).finally(
            () => {
                this.httpCallReady();
            }
        );
    };

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(url, options);
    }

    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.patch(url, body, options);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.head(url, options);
    }

    /**
     * Performs a request with `options` http method.
     */
    options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.httpCallRequested();
        return super.options(url, options).finally(
            () => {
                this.httpCallReady();
            }
        );
    }


    private httpCallReady(): void {
        this.activeCalls--;
        if (this.activeCalls === 0) {
            this.store.dispatch(new DisableBusyFlag());
        }
    }

    private httpCallRequested(): void {
        if (this.activeCalls === 0) {
            this.store.dispatch(new EnableBusyFlag());
        }
        this.activeCalls++;
    }
}

export function customHttpFactory(backend: XHRBackend,
                                  defaultOptions: RequestOptions,
                                  store: Store<ApplicationState>) {
    return new CustomHttp(backend, defaultOptions, store);
}