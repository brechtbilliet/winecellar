import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Wine} from "../../entities/Wine";
import {StockSandbox} from "../../stock.sandbox";
@Component({
    selector: "add-stock-page",
    template: `
       <default-page>
            <main>
                <div class="row">
                    <div class="col-sm-12">
                        <h1><i class="fa fa-plus-circle"></i>&nbsp;Add wine</h1>
                    </div>
                </div>
                <div class="row">
                    <detail-wine-form (onSave)="onSave($event)"></detail-wine-form>
                </div>
            </main>
        </default-page>
  `
})
export class AddStockPageContainer {
    constructor(private sb: StockSandbox, private router: Router) {
    }

    onSave(wine: Wine): void {
        this.sb.addWine(wine);
        this.router.navigate(["/stock"]);
    }
}