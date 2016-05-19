import {Store} from "@ngrx/store";
import * as toastr from "toastr";
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptionsArgs} from "@angular/http";
import {Wine} from "../entities/Wine";
import {
    DATA_WINES_ADD_ALL,
    DATA_WINES_ADD,
    DATA_WINES_REMOVE,
    DATA_WINES_UPDATE_RATE,
    DATA_WINES_UPDATE,
    DATA_WINES_UPDATE_STOCK
} from "../../common/actionTypes";
import {ApplicationState} from "../../common/state/ApplicationState";
import {API_URL} from "../../configuration";
import {BusyHandlerService} from "../../common/services/busyHandler.service";
import {Observable} from "rxjs";

@Injectable()
export class WineService {
    constructor(private store:Store<ApplicationState>, private busyHandler:BusyHandlerService,
                private http:Http) {
    }

    public add(wine:Wine):void {
        this.busyHandler.handle(this.http.post(API_URL + "/wines", JSON.stringify(wine), this.getHttpOptions())
            .map((res:Response) => res.json()))
            .subscribe((wine:Wine) => {
                this.store.dispatch({type: DATA_WINES_ADD, payload: {wine}});
            }, (resp:Response) => this.onError(resp));
    }

    public update(id:string, wine:Wine):void {
        this.busyHandler.handle(this.http.put(API_URL + "/wines/" + id, JSON.stringify(wine), this.getHttpOptions())
            .map((res:Response) => res.json()))
            .subscribe(() => {
                this.store.dispatch({type: DATA_WINES_UPDATE, payload: {wine: wine, _id: id}});
            }, (resp:Response) => this.onError(resp));
    }

    public remove(wine:Wine):void {
        this.busyHandler.handle(this.http.delete(API_URL + "/wines/" + wine._id, this.getHttpOptions()))
            .subscribe(() => {
                this.store.dispatch({type: DATA_WINES_REMOVE, payload: {_id: wine._id}});
            }, (resp:Response) => this.onError(resp));
    }

    public load():void {
        this.busyHandler.handle(this.http.get(API_URL + "/wines", this.getHttpOptions())
            .map((res:Response) => res.json()))
            .subscribe((wines:Array<Wine>) => {
                this.store.dispatch({type: DATA_WINES_ADD_ALL, payload: {wines}});
            }, (resp:Response) => this.onError(resp));
    }

    public fetchWine(id:string):Observable<Wine> {
        return this.busyHandler.handle(this.http.get(API_URL + "/wines/" + id, this.getHttpOptions())
            .map((res:Response) => res.json()));
    }

    public setRate(wine:Wine, myRating:number):void {
        let newWine:Wine = Object.assign({}, wine, {myRating: myRating});
        this.busyHandler.handle(
            this.http.put(API_URL + "/wines/" + wine._id, JSON.stringify(newWine), this.getHttpOptions())
                .map((res:Response) => res.json()))
            .subscribe(() => {
                this.store.dispatch({type: DATA_WINES_UPDATE_RATE, payload: {_id: wine._id, myRating}});
            }, (resp:Response) => this.onError(resp));
    }

    public setStock(wine:Wine, inStock:number):void {
        let newWine:Wine = <Wine> Object.assign({}, wine, {inStock: inStock});
        this.busyHandler.handle(
            this.http.put(API_URL + "/wines/" + wine._id, JSON.stringify(newWine), this.getHttpOptions())
                .map((res:Response) => res.json()))
            .subscribe(() => {
                this.store.dispatch({type: DATA_WINES_UPDATE_STOCK, payload: {_id: wine._id, inStock}});
            }, (resp:Response) => this.onError(resp));
    }

    private getHttpOptions():RequestOptionsArgs {
        return {
            headers: new Headers({
                "authorization": "Bearer " + this.store.getState().data.authentication.jwtToken,
                "Content-Type": "application/json"
            })
        };
    }

    private onError(resp:Response):void {
        toastr.error(resp.json().error);
    }
}