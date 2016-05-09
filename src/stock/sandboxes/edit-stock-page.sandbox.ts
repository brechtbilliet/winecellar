import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../common/state/ApplicationState";
import {WineResource} from "../resources/wine.resource";
import {Wine} from "../entities/Wine";
import {CONTAINER_EDITSTOCKPAGE_CLEAR_WINE, CONTAINER_EDITSTOCKPAGE_SET_WINE} from "../../common/actionTypes";

@Injectable()
export class EditStockPageSandbox {
    public editWine$ = this.store.select(state => state.containers.editStockPage.wine);

    constructor(private store: Store<ApplicationState>, private wineResource: WineResource) {
    }

    public updateWine(id: string, wine: Wine): void {
        this.wineResource.update(id, wine);
    }

    public clearWine(): void {
        this.store.dispatch({type: CONTAINER_EDITSTOCKPAGE_CLEAR_WINE});
    }

    public fetchWine(id: string): void {
        this.wineResource.fetchWine(id).subscribe((wine: Wine) =>
            this.store.dispatch({type: CONTAINER_EDITSTOCKPAGE_SET_WINE, payload: wine}));
    }
}
