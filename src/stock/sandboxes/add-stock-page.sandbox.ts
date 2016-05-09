import {Injectable} from "@angular/core";
import {WineResource} from "../resources/wine.resource";
import {Wine} from "../entities/Wine";

@Injectable()
export class AddStockPageSandbox {
    constructor(private wineResource: WineResource) {
    }

    public addWine(wine: Wine): void {
        this.wineResource.add(wine);
    }
}