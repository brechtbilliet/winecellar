import {Component, OnInit} from "@angular/core";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {Main} from "../../../common/components/main/main.component";
import {CollapsableSidebar} from "../../../common/containers/collapsable-sidebar/collapsable-sidebar.container";
import {FavoriteWines} from "../../components/favorite-wines/favorite-wines.component";
import {Wine} from "../../entities/Wine";
import {Observable} from "rxjs/Observable";
import {WineResults} from "../../components/wine-results/wine-results.component";
import * as _ from "lodash";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Control} from "@angular/common";
import {StockPageSandbox} from "../../sandboxes/stock-page.sandbox";
import {WineService} from "../../services/wine.service";
@Component({
    selector: "stock-page",
    providers: [WineService, StockPageSandbox],
    directives: [ROUTER_DIRECTIVES, DefaultPage, Main, CollapsableSidebar, FavoriteWines, WineResults],
    template: `
        <default-page>
            <collapsable-sidebar class="hidden-sm hidden-xs">
                <favorite-wines (setStock)="onSetStock($event)" [wines]="wines$ | async">
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
                        <a [routerLink]="['AddWine']" class="btn btn-primary btn-lg btn-block">
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

    public wines$ = this.sandbox.wines$;
    public numberOfWines$ = this.wines$.map(wines => _.sumBy(wines, (wine:Wine) => wine.inStock));
    public matchingWines$ = Observable.combineLatest(this.searchCtrl.valueChanges.startWith(""), this.wines$)
        .map((resp:[string, Array<Wine>]) => {
            let term = resp[0].toLowerCase(), wines = resp[1];
            return wines.filter(wine => wine.name.toLowerCase().indexOf(term) > -1);
        });

    constructor(public sandbox:StockPageSandbox) {
    }

    public onRemove(wine:Wine):void {
        this.sandbox.removeWine(wine);
    }

    public onSetRate(item: {wine: Wine, value: number}):void {
        this.sandbox.setRate(item.wine, item.value);
    }

    public onSetStock(item: {wine: Wine, value: number}):void {
        this.sandbox.setStock(item.wine, item.value);
    }
}
