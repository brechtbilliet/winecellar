import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../common/state/ApplicationState";
import {Wine} from "../entities/Wine";
import {WineResource} from "../resources/wine.resource";

@Injectable()
export class StockPageSandbox {
    public wines$ = this.store.select(state => state.data.wines);

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