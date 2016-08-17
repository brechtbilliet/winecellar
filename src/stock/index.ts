import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {routing} from "./routes";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {StockService} from "./services/stock.service";
import {WineComService} from "./services/wineCom.service";
import {StockPageSandbox} from "./sandboxes/stock-page.sandbox";
import {AddStockPageSandbox} from "./sandboxes/add-stock-page.sandbox";
import {EditStockPageSandbox} from "./sandboxes/edit-stock-page.sandbox";
import {AddStockPage} from "./containers/add-stock-page/add-stock-page.container";
import {WineSearch} from "./containers/wine-search/wine-search.container";
import {StockPage} from "./containers/stock-page/stock-page.container";
import {EditStockPage} from "./containers/edit-stock-page/edit-stock-page.container";
import {DetailWineForm} from "./components/detail-wine-form/detail-wine-form.component";
import {FavoriteWines} from "./components/favorite-wines/favorite-wines.component";
import {WineResult} from "./components/wine-result/wine-result.component";
import {WineResults} from "./components/wine-results/wine-results.component";
import {CommonLogicModule} from "../common/index";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {WineSearchSandbox} from "./sandboxes/wine-search.sandbox";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule, HttpModule,  CommonLogicModule, routing],
    declarations: [AddStockPage, EditStockPage, StockPage, WineSearch, DetailWineForm, FavoriteWines, WineResult, WineResults],
    providers: [StockService, WineComService, StockPageSandbox, AddStockPageSandbox, EditStockPageSandbox, WineSearchSandbox]
})
export class StockModule {
}

