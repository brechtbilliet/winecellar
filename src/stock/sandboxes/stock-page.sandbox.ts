import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../common/state/ApplicationState";
import {Wine} from "../entities/Wine";
import {StockService} from "../services/stock.service";

@Injectable()
export class StockPageSandbox {
    public wines$ = this.store.select(state => state.data.wines);

    constructor(private store: Store<ApplicationState>, private stockService: StockService) {
    }

    public removeWine(wine: Wine): void {
        this.stockService.remove(wine);
    }

    public setRate(wine: Wine, rate: number): void {
        this.stockService.setRate(wine, rate);
    }

    public setStock(wine: Wine, inStock: number): void {
        this.stockService.setStock(wine, inStock);
    }
}