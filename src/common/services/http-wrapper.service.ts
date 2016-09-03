import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, RequestOptions, ConnectionBackend, Request, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Store} from "@ngrx/store";
import {enableBusy, disableBusy} from "../../statemanagement/actionCreators";
import {ApplicationState} from "../../statemanagement/state/ApplicationState";
@Injectable()
export class HttpWrapper extends Http {
    private activeCalls: number;
    private store: Store<ApplicationState>;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, store: Store<ApplicationState>) {
        super(backend, defaultOptions);
        this.store = store;
        this.activeCalls = 0;
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.httpCallRequested();
        return super.get(url, options).finally<Response>(
            () => {
                this.httpCallReady();
            }
        );
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        this.httpCallRequested();
        return super.request(url, options).finally<Response>(
            () => {
                this.httpCallReady();
            }
        );
    };

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        this.httpCallRequested();
        return super.post(url, body, options).finally<Response>(
            () => {
                this.httpCallReady();
            }
        );
    };

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        this.httpCallRequested();
        return super.put(url, body, options).finally<Response>(
            () => {
                this.httpCallReady();
            }
        );
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.httpCallRequested();
        return super.delete(url, options).finally<Response>(
            () => {
                this.httpCallReady();
            }
        );
    }

    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        this.httpCallRequested();
        return super.patch(url, body, options).finally<Response>(
            () => {
                this.httpCallReady();
            }
        );
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.httpCallRequested();
        return super.head(url, options).finally<Response>(
            () => {
                this.httpCallReady();
            }
        );
    }

    /**
     * Performs a request with `options` http method.
     */
    options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.httpCallRequested();
        return super.options(url, options).finally<Response>(
            () => {
                this.httpCallReady();
            }
        );
    }


    private httpCallReady(): void {
        this.activeCalls--;
        if (this.activeCalls === 0) {
            this.store.dispatch(disableBusy());
        }
    }

    private httpCallRequested(): void {
        this.activeCalls++;
        if (this.activeCalls !== 0) {
            this.store.dispatch(enableBusy());
        }
    }

}