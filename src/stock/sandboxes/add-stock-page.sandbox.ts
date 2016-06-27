import {Injectable} from "@angular/core";
import {Wine} from "../entities/Wine";
import {StockService} from "../services/stock.service";

@Injectable()
export class AddStockPageSandbox {
    constructor(private sb: StockService) {
    }

    public addWine(wine: Wine): void {
        this.sb.add(wine);
    }
}