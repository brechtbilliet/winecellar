import {Injectable} from "angular2/core";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../common/state/ApplicationState";
import {Wine} from "../entities/Wine";
import {WineResource} from "../resources/wine.resource";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StockPageSandbox {
    public wines$: Observable<Array<Wine>> = this.store.select((state: ApplicationState) => state.data.wines);

    constructor(private store: Store<ApplicationState>, private wineResource: WineResource) {
    }

    public removeWine(wine: Wine): void {
        this.wineResource.remove(wine);
    }

    public setRate(wine: Wine, rate: number): void {
        this.wineResource.setRate(wine, rate);
    }

    public setStock(wine: Wine, inStock: number): void {
        this.wineResource.setStock(wine, inStock);
    }
}