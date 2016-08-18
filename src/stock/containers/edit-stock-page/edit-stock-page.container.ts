import {Component} from "@angular/core";
import {Wine} from "../../entities/Wine";
import {EditStockPageSandbox} from "../../sandboxes/edit-stock-page.sandbox";
import {ActivatedRoute, Router} from "@angular/router";
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
export class EditStockPage {
    id = this.route.snapshot.params["id"];
    editWine$ = this.sb.fetchWine(this.id).publishLast().refCount();

    constructor(public sb: EditStockPageSandbox,
                private route: ActivatedRoute,
                private router: Router) {
    }

    onSave(wine: Wine): void {
        this.sb.updateWine(this.id, wine);
        this.router.navigate(["/stock"]);
    }
}