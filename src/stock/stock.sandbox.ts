import {StockService} from "./services/stock.service";
import {Injectable} from "@angular/core";
import {WineComService, WineComSearchResult} from "./services/wineCom.service";
import {Wine} from "./entities/Wine";
import {Observable} from "rxjs/Observable";
import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";
@Injectable()
export class StockSandbox {
    wines$ = this.store.select(state => state.data.wines);
    isAuthenticated$ = this.store.select(state => state.data.authentication.isAuthenticated);

    constructor(private store: Store<ApplicationState>, private stockService: StockService, private wineComService: WineComService) {
    }

    addWine(wine: Wine): void {
        this.stockService.add(wine);
    }

    updateWine(id: string, wine: Wine): void {
        this.stockService.update(id, wine);
    }

    fetchWine(id: string): Observable<Wine> {
        return this.stockService.fetchWine(id);
    }

    removeWine(wine: Wine): void {
        this.stockService.remove(wine);
    }

    setRate(wine: Wine, rate: number): void {
        this.stockService.setRate(wine, rate);
    }

    setStock(wine: Wine, inStock: number): void {
        this.stockService.setStock(wine, inStock);
    }

    search(term: string): Observable<WineComSearchResult> {
        return this.wineComService.search(term);
    }
}