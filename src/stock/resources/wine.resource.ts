import {Store} from "@ngrx/store";
import * as toastr from "toastr";
import {Injectable} from "angular2/core";
import {Http, Response, Headers, RequestOptionsArgs} from "angular2/http";
import {Wine} from "../entities/Wine";
import {
    DATA_WINES_ADD_ALL,
    DATA_WINES_ADD,
    DATA_WINES_REMOVE,
    CONTAINER_APPLICATION_DISABLE_BUSY_FLAG,
    DATA_WINES_UPDATE_RATE,
    DATA_WINES_UPDATE,
    DATA_WINES_UPDATE_STOCK
} from "../../common/actionTypes";
import {ApplicationState} from "../../common/state/ApplicationState";
import {API_URL} from "../../configuration";
import {BusyHandlerService} from "../../common/services/busyHandler.service";
import {Observable} from "rxjs";

@Injectable()
export class WineResource {
    constructor(private store: Store<ApplicationState>, private busyHandler: BusyHandlerService,
                private http: Http) {
    }

    public add(wine: Wine): void {
        let obs$: Observable<Wine> = this.busyHandler.handle(this.http.post(API_URL + "/wines", JSON.stringify(wine), this.getHttpOptions())
            .map((res: Response) => res.json()));

        obs$.subscribe((payload: Wine) => {
            this.store.dispatch({type: DATA_WINES_ADD, payload});
        }, (resp: Response) => this.onError(resp));
    }

    public update(id: string, wine: Wine): void {
        let obs$: Observable<any> =
            this.busyHandler.handle(this.http.put(API_URL + "/wines/" + id, JSON.stringify(wine), this.getHttpOptions())
                .map((res: Response) => res.json()));

        obs$.subscribe(() => {
            this.store.dispatch({type: DATA_WINES_UPDATE, payload: {wine: wine, _id: id}});
        }, (resp: Response) => this.onError(resp));
    }

    public remove(wine: Wine): void {
        let obs$: Observable<any> = this.busyHandler.handle(this.http.delete(API_URL + "/wines/" + wine._id, this.getHttpOptions()));
        obs$.subscribe(() => {
            this.store.dispatch({type: DATA_WINES_REMOVE, payload: wine._id});
        }, (resp: Response) => this.onError(resp));
    }

    public load(): void {
        let obs$: Observable<Array<Wine>> =
            this.busyHandler.handle(this.http.get(API_URL + "/wines", this.getHttpOptions())
                .map((res: Response) => res.json()));
        obs$.subscribe((wines: Array<Wine>) => {
            this.store.dispatch({type: DATA_WINES_ADD_ALL, payload: wines});
        }, (resp: Response) => this.onError(resp));
    }

    public fetchWine(id: string): Observable<Wine> {
        return this.busyHandler.handle(this.http.get(API_URL + "/wines/" + id, this.getHttpOptions())
            .map((res: Response) => res.json()));
    }

    public setRate(wine: Wine, myRating: number): void {
        let newWine: Wine = <Wine> Object.assign({}, wine, {myRating: myRating});
        let obs$: Observable<any> = this.busyHandler.handle(
            this.http.put(API_URL + "/wines/" + wine._id, JSON.stringify(newWine), this.getHttpOptions())
                .map((res: Response) => res.json()));
        obs$.subscribe(() => {
            let payload: any = {_id: wine._id, myRating};
            this.store.dispatch({type: DATA_WINES_UPDATE_RATE, payload: payload});
        }, (resp: Response) => this.onError(resp));
    }

    public setStock(wine: Wine, inStock: number): void {
        let newWine: Wine = <Wine> Object.assign({}, wine, {inStock: inStock});
        let obs$: Observable<any> = this.busyHandler.handle(
            this.http.put(API_URL + "/wines/" + wine._id, JSON.stringify(newWine), this.getHttpOptions())
                .map((res: Response) => res.json()));
        obs$.subscribe(() => {
            let payload: any = {_id: wine._id, inStock};
            this.store.dispatch({type: DATA_WINES_UPDATE_STOCK, payload: payload});
        }, (resp: Response) => this.onError(resp));
    }

    private getHttpOptions(): RequestOptionsArgs {
        return {
            headers: new Headers({
                "authorization": "Bearer " + this.store.getState().data.authentication.jwtToken,
                "Content-Type": "application/json"
            })
        };
    }

    private onError(resp: Response): void {
        toastr.error(resp.json().error);
        this.store.dispatch({type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
    }
}