import {Component} from "@angular/core";
import {Wine} from "../../entities/Wine";
import {ActivatedRoute, Router} from "@angular/router";
import {StockSandbox} from "../../stock.sandbox";
import {ApplicationState} from "../../../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";
@Component({
    selector: "edit-stock-page",
    template: `
    <default-page>
        <main>
            <div class="row">
                <div class="col-sm-12">
                    <h1><i class="fa fa-pencil"></i>&nbsp;Edit wine</h1>
                </div>
             </div>
             <div class="row" *ngIf="(editWine$|async)">
                <detail-wine-form [wine]="editWine$|async" (onSave)="onSave($event)"></detail-wine-form>
            </div>
        </main>
    </default-page>
     `
})
export class EditStockPageContainer {
    id = this.route.snapshot.params["id"];

    editWine$ = this.sb.isAuthenticated$
        .filter(isAuthenticated => isAuthenticated) // only when authenticated
        .flatMap(() => {
            return this.sb.fetchWine(this.id);
        }).cache(); // avoid changedetection to run twice

    constructor(public sb: StockSandbox,
                private route: ActivatedRoute,
                private router: Router) {
    }

    onSave(wine: Wine): void {
        this.sb.updateWine(this.id, wine);
        this.router.navigate(["/stock"]);
    }
}