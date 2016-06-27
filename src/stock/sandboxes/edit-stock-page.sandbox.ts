import {Injectable} from "@angular/core";
import {Wine} from "../entities/Wine";
import {StockService} from "../services/stock.service";
import {Observable} from "rxjs/Rx";

@Injectable()
export class EditStockPageSandbox {
    constructor(private StockService: StockService) {
    }

    public updateWine(id: string, wine: Wine): void {
        this.StockService.update(id, wine);
    }

    public fetchWine(id: string): Observable<Wine> {
        return this.StockService.fetchWine(id);
    }
}
