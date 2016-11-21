import {StockService} from "./services/stock.service";
import {Injectable} from "@angular/core";
import {WineComService, WineComSearchResult} from "./services/wineCom.service";
import {Wine} from "./entities/Wine";
import {Observable} from "rxjs/Observable";
import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {Store, Action} from "@ngrx/store";
import * as toastr from "toastr";
import {UNDO_ACTION} from "ngrx-undo";
import {AddWine, UpdateWine, UpdateStock, RemoveWine, UpdateRate} from "../statemanagement/actions/data/wine";
@Injectable()
export class StockSandbox {
    wines$ = this.store.select(state => state.data.wines);
    isAuthenticated$ = this.store.select(state => state.data.authentication.isAuthenticated);

    constructor(private store: Store<ApplicationState>, private stockService: StockService, private wineComService: WineComService) {
    }

    addWine(wine: Wine): void {
        this.stockService.add(wine).subscribe((wine: Wine) => {
            this.store.dispatch(new AddWine(wine));
        }, () => this.handleError());
    }

    updateWine(id: string, wine: Wine): void {
        let action = new UpdateWine(id, wine);
        this.store.dispatch(action);
        this.stockService.update(id, wine).subscribe(() => {
        }, () => this.handleError(action));
    }

    fetchWine(id: string): Observable<Wine> {
        return this.stockService.fetchWine(id).share();
    }

    removeWine(wine: Wine): void {
        let action = new RemoveWine(wine._id);
        this.store.dispatch(action);
        this.stockService.remove(wine).subscribe(() => {
        }, () => this.handleError(action));
    }

    setRate(wine: Wine, rate: number): void {
        let action = new UpdateRate(wine._id, rate);
        this.store.dispatch(action);
        this.stockService.setRate(wine, rate).subscribe(() => {
        }, () => this.handleError(action));
    }

    setStock(wine: Wine, inStock: number): void {
        let action = new UpdateStock(wine._id, inStock);
        this.store.dispatch(action);
        this.stockService.setStock(wine, inStock).subscribe(() => {
        }, () => this.handleError(action));
    }

    search(term: string): Observable<WineComSearchResult> {
        return this.wineComService.search(term);
    }

    private handleError(action?: Action): void {
        toastr.error("something went wrong");
        if (action) {
            this.store.dispatch({type: UNDO_ACTION, payload: action});
        }
    }
}