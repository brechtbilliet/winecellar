import {Store} from "@ngrx/store";
import * as toastr from "toastr";
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptionsArgs, RequestOptions} from "@angular/http";
import {Wine} from "../entities/Wine";
import {ApplicationState} from "../../common/state/ApplicationState";
import {API_URL} from "../../configuration";
import {BusyHandlerService} from "../../common/services/busyHandler.service";
import {Observable} from "rxjs";
import {
    addWine,
    updateWine,
    removeWine,
    addAllWines,
    updateRateWine,
    updateStockWine
} from "../../common/actionCreators";

@Injectable()
export class StockService {
    constructor(private store: Store<ApplicationState>, private busyHandler: BusyHandlerService,
                private http: Http) {
    }

    add(wine: Wine): void {
        this.busyHandler.handle(this.http.post(API_URL + "/wines", JSON.stringify(wine), this.postPutHttpOptions())
            .map((res: Response) => res.json()))
            .subscribe((resp: Wine) => {
                this.store.dispatch(addWine(resp));
            }, (resp: Response) => this.onError(resp));
    }

    update(id: string, wine: Wine): void {
        this.busyHandler.handle(this.http.put(API_URL + "/wines/" + id, JSON.stringify(wine), this.postPutHttpOptions())
            .map((res: Response) => res.json()))
            .subscribe(() => {
                this.store.dispatch(updateWine(id, wine));
            }, (resp: Response) => this.onError(resp));
    }

    remove(wine: Wine): void {
        this.busyHandler.handle(this.http.delete(API_URL + "/wines/" + wine._id, this.getRemoveHttpOptions()))
            .subscribe(() => {
                this.store.dispatch(removeWine(wine._id));
            }, (resp: Response) => this.onError(resp));
    }

    load(): void {
        this.busyHandler.handle(this.http.get(API_URL + "/wines", this.getRemoveHttpOptions()))
            .map(response => response.json())
            .subscribe((wines: Array<Wine>) => {
                this.store.dispatch(addAllWines(wines));
            }, (resp: Response) => this.onError(resp));
    }

    fetchWine(id: string): Observable<Wine> {
        return this.busyHandler.handle(this.http.get(API_URL + "/wines/" + id, this.getRemoveHttpOptions())
            .map((res: Response) => res.json()));
    }

    setRate(wine: Wine, myRating: number): void {
        let newWine: Wine = Object.assign({}, wine, {myRating: myRating});
        this.busyHandler.handle(
            this.http.put(API_URL + "/wines/" + wine._id, JSON.stringify(newWine), this.postPutHttpOptions())
                .map((res: Response) => res.json()))
            .subscribe(() => {
                this.store.dispatch(updateRateWine(wine._id, myRating));
            }, (resp: Response) => this.onError(resp));
    }

    setStock(wine: Wine, inStock: number): void {
        let newWine: Wine = <Wine> Object.assign({}, wine, {inStock: inStock});
        this.busyHandler.handle(
            this.http.put(API_URL + "/wines/" + wine._id, JSON.stringify(newWine), this.postPutHttpOptions())
                .map((res: Response) => res.json()))
            .subscribe(() => {
                this.store.dispatch(updateStockWine(wine._id, inStock));
            }, (resp: Response) => this.onError(resp));
    }

    private postPutHttpOptions(): RequestOptionsArgs {
        let state: ApplicationState;
        this.store.take(1).subscribe(s => state = s);
        let headers = new Headers({
            "authorization": "Bearer " + state.data.authentication.jwtToken,
            "Content-Type": "application/json"
        });
        return new RequestOptions({ headers: headers });
    }


    private getRemoveHttpOptions(): RequestOptionsArgs {
        let state: ApplicationState;
        this.store.take(1).subscribe(s => state = s);
        let headers = new Headers({
            "authorization": "Bearer " + state.data.authentication.jwtToken
        });
        return new RequestOptions({ headers: headers });
    }

    private onError(resp: Response): void {
        toastr.error(resp.json().message);
    }
}