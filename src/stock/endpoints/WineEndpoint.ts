import {Store} from "@ngrx/store";
import * as toastr from "toastr";
import {Injectable} from "angular2/core";
import {Http, Response, Headers, RequestOptionsArgs} from "angular2/http";

import {Wine} from "../entities/Wine";
import {API_URL} from "../../config";
import {
    DATA_WINES_ADD_ALL, DATA_WINES_ADD, DATA_WINES_REMOVE, CONTAINER_APPLICATION_ENABLE_BUSY_FLAG,
    CONTAINER_APPLICATION_DISABLE_BUSY_FLAG, DATA_WINES_UPDATE_RATE, CONTAINER_EDITWINEPAGE_SET_WINE, DATA_WINES_UPDATE,
    DATA_WINES_UPDATE_STOCK
} from "../../common/actionTypes";
import {Subject} from "rxjs/Subject";
import {ApplicationState} from "../../common/state/ApplicationState";

@Injectable()
export class WineEndpoint {
    constructor(private store: Store<ApplicationState>,
                private http: Http) {
    }

    public add(wine: Wine): Subject<Wine> {
        this.store.dispatch({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        let subject: Subject<Wine> = new Subject();
        this.http.post(API_URL + "/wines", JSON.stringify(wine), this.getHttpOptions())
            .map((res: Response) => res.json())
            .subscribe(subject);

        subject.subscribe((payload: Wine) => {
            this.store.dispatch({type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
            this.store.dispatch({type: DATA_WINES_ADD, payload});
        }, (resp: Response) => this.onError(resp));
        return subject;
    }

    public update(id: string, wine: Wine): Subject<Wine> {
        this.store.dispatch({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        let subject: Subject<Wine> = new Subject();
        this.http.put(API_URL + "/wines/" + id, JSON.stringify(wine), this.getHttpOptions())
            .map((res: Response) => res.json())
            .subscribe(subject);

        subject.subscribe(() => {
            this.store.dispatch({type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
            this.store.dispatch({
                type: DATA_WINES_UPDATE,
                payload: {wine: wine, _id: id}
            });
        }, (resp: Response) => this.onError(resp));
        return subject;
    }

    public remove(wine: Wine): void {
        this.store.dispatch({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        this.http.delete(API_URL + "/wines/" + wine._id, this.getHttpOptions())
            .subscribe(() => {
                this.store.dispatch({type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
                this.store.dispatch({
                    type: DATA_WINES_REMOVE,
                    payload: wine._id
                });
            }, (resp: Response) => this.onError(resp));
    }

    public load(): void {
        this.store.dispatch({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        this.http.get(API_URL + "/wines", this.getHttpOptions())
            .map((res: Response) => res.json())
            .subscribe((wines: Array<Wine>) => {
                this.store.dispatch({type: DATA_WINES_ADD_ALL, payload: wines});
                this.store.dispatch({type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
            }, (resp: Response) => this.onError(resp));
    }

    public loadById(id: string): void {
        this.store.dispatch({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        this.http.get(API_URL + "/wines/" + id, this.getHttpOptions())
            .map((res: Response) => res.json())
            .subscribe((wine: Wine) => {
                this.store.dispatch({type: CONTAINER_EDITWINEPAGE_SET_WINE, payload: wine});
                this.store.dispatch({type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
            }, (resp: Response) => this.onError(resp));
    }

    public setRate(wine: Wine, myRating: number): void {
        this.store.dispatch({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        let newWine: Wine = <Wine> _.assign({}, wine, {myRating: myRating});
        this.http.put(API_URL + "/wines/" + wine._id, JSON.stringify(newWine), this.getHttpOptions())
            .map((res: Response) => res.json())
            .subscribe(() => {
                let payload: any = {wine, myRating};
                this.store.dispatch({type: DATA_WINES_UPDATE_RATE, payload: payload});
                this.store.dispatch({type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
            }, (resp: Response) => this.onError(resp));
    }

    public setStock(wine: Wine, inStock: number): void {
        this.store.dispatch({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        let newWine: Wine = <Wine> _.assign({}, wine, {inStock: inStock});
        this.http.put(API_URL + "/wines/" + wine._id, JSON.stringify(newWine), this.getHttpOptions())
            .map((res: Response) => res.json())
            .subscribe(() => {
                let payload: any = {wine, inStock};
                this.store.dispatch({type: DATA_WINES_UPDATE_STOCK, payload: payload});
                this.store.dispatch({type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
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