import {WineCellarApp} from "./common/containers/application/application.container.ts";
import "rxjs/add/operator/do";
import {store} from "./common/store";
import {HttpModule} from "@angular/http";
import {instrumentStore} from "@ngrx/store-devtools";
import {provideStore} from "@ngrx/store";
import {useLogMonitor} from "@ngrx/store-log-monitor";
import {AppRoutes} from "./common/routes";
import {provideRouter} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {AuthenticatedGuard} from "./common/authenticated.guard";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {StockPage} from "./stock/containers/stock-page/stock-page.container";
import {AddStockPage} from "./stock/containers/add-stock-page/add-stock-page.container";
import {EditStockPage} from "./stock/containers/edit-stock-page/edit-stock-page.container";
import {AboutPage} from "./about/containers/about-page/about-page.container";

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpModule],
    declarations: [WineCellarApp, StockPage, AddStockPage, EditStockPage, AboutPage],
    bootstrap: [WineCellarApp],
    providers: [
        AuthenticatedGuard,
        provideStore(store),
        provideRouter(AppRoutes),
        instrumentStore({
            monitor: useLogMonitor({
                visible: false,
                position: "right"
            })
        })
    ]
})
export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
