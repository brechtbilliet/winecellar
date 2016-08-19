import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {routing} from "./routes";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {StockService} from "./services/stock.service";
import {WineComService} from "./services/wineCom.service";
import {AddStockPageContainer} from "./containers/add-stock-page/add-stock-page.container";
import {WineSearchContainer} from "./containers/wine-search/wine-search.container";
import {StockPageContainer} from "./containers/stock-page/stock-page.container";
import {EditStockPageContainer} from "./containers/edit-stock-page/edit-stock-page.container";
import {DetailWineFormComponent} from "./components/detail-wine-form/detail-wine-form.component";
import {FavoriteWinesComponent} from "./components/favorite-wines/favorite-wines.component";
import {WineResultComponent} from "./components/wine-result/wine-result.component";
import {WineResultsComponent} from "./components/wine-results/wine-results.component";
import {CommonLogicModule} from "../common/index";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {StockSandbox} from "./stock.sandbox";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule, HttpModule, CommonLogicModule, routing],
    declarations: [AddStockPageContainer, EditStockPageContainer, StockPageContainer, WineSearchContainer, DetailWineFormComponent,
        FavoriteWinesComponent, WineResultComponent, WineResultsComponent],
    providers: [StockService, WineComService, StockSandbox]
})
export class StockModule {
}

