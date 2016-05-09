import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../common/state/ApplicationState";
import {Wine} from "../entities/Wine";
import {WineService} from "../services/wine.service";

@Injectable()
export class StockPageSandbox {
    public wines$ = this.store.select(state => state.data.wines);

    constructor(private store: Store<ApplicationState>, private wineService: WineService) {
    }

    public removeWine(wine: Wine): void {
        this.wineService.remove(wine);
    }

    public setRate(wine: Wine, rate: number): void {
        this.wineService.setRate(wine, rate);
    }

    public setStock(wine: Wine, inStock: number): void {
        this.wineService.setStock(wine, inStock);
    }
}