import {Component} from "@angular/core";
import {Panel} from "../../../common/components/panel/panel.component";
import {Main} from "../../../common/components/main/main.component";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {WineResults} from "../../components/wine-results/wine-results.component";
import {CollapsableSidebar} from "../../../common/containers/collapsable-sidebar/collapsable-sidebar.container";
import {Control} from "@angular/common";
import {Wine} from "../../entities/Wine";
import * as _ from "lodash";
import {Observable} from "rxjs/Rx";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {FavoriteWines} from "../../components/favorite-wines/favorite-wines.component";
import {StockPageSandbox} from "../../sandboxes/stock-page.sandbox";
@Component({
    selector: "stock-page",
    directives: [Panel, DefaultPage, Main, CollapsableSidebar, FavoriteWines, WineResults, ROUTER_DIRECTIVES],
    providers: [StockPageSandbox],
    template: `
        <default-page>
            <collapsable-sidebar class="hidden-sm hidden-xs">
                <favorite-wines (setStock)="onSetStock($event)" [wines]="favoriteWines$ | async">
                </favorite-wines>
            </collapsable-sidebar>
            <main>
                <div class="row">
                    <div class="col-sm-8">
                        <div class="input-group">
                            <input type="text" class="form-control input-lg" [ngFormControl]="searchCtrl"/>
                            <span class="input-group-addon"><i class="fa fa-search"></i></span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <a  class="btn btn-primary btn-lg btn-block" [routerLink]="['/AddWine']">
                            <i class="fa fa-plus-circle"></i>&nbsp;Add
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <h2>
                            <i class="fa fa-user"></i>&nbsp;My wines 
                            <span class="badge badge-primary">{{numberOfWines$|async}}</span>
                        </h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <wine-results 
                            [wines]="matchingWines$| async" 
                            (remove)="onRemove($event)" 
                            (setRate)="onSetRate($event)" 
                            (setStock)="onSetStock($event)">
                        </wine-results>
                    </div>
                </div>
            </main>
        </default-page>
     `
})
export class StockPage {
    public searchCtrl = new Control("");

    public wines$ = this.sb.wines$;
    public favoriteWines$ = this.wines$.map(wines => _.orderBy(wines, ["myRating"], ["desc"]));
    public numberOfWines$ = this.wines$.map(wines => _.sumBy(wines, (wine: Wine) => wine.inStock));
    public matchingWines$ = Observable.combineLatest(
        this.searchCtrl.valueChanges.startWith(""), this.wines$, (term: string, wines: Array<Wine>) => {
            return wines.filter(wine => wine.name.toLowerCase().indexOf(term) > -1);
        });

    constructor(private sb: StockPageSandbox) {
    }

    public onRemove(wine: Wine): void {
        this.sb.removeWine(wine);
    }

    public onSetRate(item: {wine: Wine, value: number}): void {
        this.sb.setRate(item.wine, item.value);
    }

    public onSetStock(item: {wine: Wine, value: number}): void {
        this.sb.setStock(item.wine, item.value);
    }
}
