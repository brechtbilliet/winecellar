import {Store} from "@ngrx/store";
import * as toastr from "toastr";
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptionsArgs, RequestOptions} from "@angular/http";
import {Wine} from "../entities/Wine";
import {ApplicationState} from "../../statemanagement/state/ApplicationState";
import {API_URL} from "../../configuration";
import {BusyHandlerService} from "../../common/services/busyHandler.service";
import {Observable} from "rxjs";
import {addWine, addAllWines} from "../../statemanagement/actionCreators";

@Injectable()
export class StockService {
    constructor(private store: Store<ApplicationState>, private busyHandler: BusyHandlerService,
                private http: Http) {
    }

    add(wine: Wine): void {
        let result$ = this.http.post(`${API_URL}/wines`, wine, this.authorizedHttpOptions()).publishReplay(1).refCount().map((res: Response) => res.json());
        this.busyHandler.handle(result$);
        result$.subscribe(resp => this.store.dispatch(addWine(resp)), resp => this.onError(resp));
    }

    update(id: string, wine: Wine): void {
       this.http.put(`${API_URL}/wines/${id}`, wine, this.authorizedHttpOptions()).subscribe(() => {}, this.onError);
    }

    remove(wine: Wine): void {
        this.http.delete(`${API_URL}/wines/${wine._id}`, this.authorizedHttpOptions()).subscribe(() => {}, this.onError);
    }

    load(): void {
        let result$ = this.http.get(`${API_URL}/wines`, this.authorizedHttpOptions()).publishReplay(1).refCount()
            .map((res: Response) => res.json());
        this.busyHandler.handle(result$);
        result$.subscribe(wines => this.store.dispatch(addAllWines(wines)), (resp: Response) => this.onError(resp));
    }

    fetchWine(id: string): Observable<Wine> {
        let result$ = this.http.get(`${API_URL}/wines/${id}`, this.authorizedHttpOptions()).publishReplay(1).refCount()
            .map((res: Response) => res.json());
        this.busyHandler.handle(result$);
        return result$;
    }

    setRate(wine: Wine, myRating: number): void {
        let newWine: Wine = Object.assign({}, wine, {myRating: myRating});
        this.http.put(`${API_URL}/wines/${wine._id}`, newWine, this.authorizedHttpOptions()).subscribe(() => {}, this.onError);
    }

    setStock(wine: Wine, inStock: number): void {
        let newWine: Wine = Object.assign({}, wine, {inStock: inStock});
        this.http.put(`${API_URL}/wines/${wine._id}`, newWine, this.authorizedHttpOptions()).subscribe(() => {}, this.onError);
    }

    private authorizedHttpOptions(): RequestOptionsArgs {
        let state: ApplicationState;
        this.store.take(1).subscribe(s => state = s);
        let headers = new Headers({
            authorization: `Bearer ${state.data.authentication.jwtToken}`
        });
        return new RequestOptions({headers: headers});
    }

    private onError(resp: Response): void {
        toastr.error(resp.json().message);
    }
}