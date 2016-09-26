import {Store} from "@ngrx/store";
import * as toastr from "toastr";
import {Injectable} from "@angular/core";
import {Response, Headers, RequestOptionsArgs, RequestOptions, Http} from "@angular/http";
import {Wine} from "../entities/Wine";
import {ApplicationState} from "../../statemanagement/state/ApplicationState";
import {API_URL} from "../../configuration";
import {Observable} from "rxjs/Observable";
import {
    addWine, addAllWines, updateWine, removeWine, updateRateWine,
    updateStockWine
} from "../../statemanagement/actionCreators";

@Injectable()
export class StockService {
    constructor(private store: Store<ApplicationState>,
                private http: Http) {
    }

    add(wine: Wine): void {
        let result$ = this.http.post(`${API_URL}/wines`, wine, this.authorizedHttpOptions())
            .map((res: Response) => res.json());
        result$.subscribe(resp => this.store.dispatch(addWine(resp)),
            (resp: Response) => {
                toastr.error(resp.json().message);
            });
    }

    update(id: string, wine: Wine): void {
        let action = updateWine(id, wine);
        this.store.dispatch(action);
        this.http.put(`${API_URL}/wines/${id}`, wine, this.authorizedHttpOptions()).subscribe(() => {
        }, (resp: Response) => {
            toastr.error(resp.json().message);
            this.store.dispatch({type: "UNDO_ACTION", payload: action});
        });
    }

    remove(wine: Wine): void {
        let action = removeWine(wine._id);
        this.store.dispatch(action);
        this.http.delete(`${API_URL}/wines/${wine._id}`, this.authorizedHttpOptions()).subscribe(() => {
        }, (resp: Response) => {
            toastr.error(resp.json().message);
            this.store.dispatch({type: "UNDO_ACTION", payload: action});
        });
    }

    load(): void {
        let result$ = this.http.get(`${API_URL}/wines`, this.authorizedHttpOptions())
            .map((res: Response) => res.json());
        result$.subscribe(wines => this.store.dispatch(addAllWines(wines)), (resp: Response) => {
            toastr.error(resp.json().message);
        });
    }

    fetchWine(id: string): Observable<Wine> {
        return this.http.get(`${API_URL}/wines/${id}`, this.authorizedHttpOptions())
            .map((res: Response) => res.json());
    }

    setRate(wine: Wine, myRating: number): void {
        let newWine: Wine = Object.assign({}, wine, {myRating: myRating});
        let action = updateRateWine(wine._id, myRating);
        this.store.dispatch(action);
        this.http.put(`${API_URL}/wines/${wine._id}`, newWine, this.authorizedHttpOptions()).subscribe(() => {
        }, (resp: Response) => {
            toastr.error(resp.json().message);
            this.store.dispatch({type: "UNDO_ACTION", payload: action});
        });
    }

    setStock(wine: Wine, inStock: number): void {
        let newWine: Wine = Object.assign({}, wine, {inStock: inStock});
        let action = updateStockWine(wine._id, inStock);
        this.store.dispatch(action);
        this.http.put(`${API_URL}/wines/${wine._id}`, newWine, this.authorizedHttpOptions()).subscribe(() => {
        }, (resp: Response) => {
            toastr.error(resp.json().message);
            this.store.dispatch({type: "UNDO_ACTION", payload: action});
        });
    }

    private authorizedHttpOptions(): RequestOptionsArgs {
        let state: ApplicationState;
        this.store.take(1).subscribe(s => state = s);
        let headers = new Headers({
            authorization: `Bearer ${state.data.authentication.jwtToken}`
        });
        return new RequestOptions({headers: headers});
    }
}