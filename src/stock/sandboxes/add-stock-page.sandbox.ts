import {Injectable} from "@angular/core";
import {Wine} from "../entities/Wine";
import {WineService} from "../services/wine.service";

@Injectable()
export class AddStockPageSandbox {
    constructor(private wineService: WineService) {
    }

    public addWine(wine: Wine): void {
        this.wineService.add(wine);
    }
}