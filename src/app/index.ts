import {routing} from "./routes";
import {BrowserModule} from "@angular/platform-browser";
import {ApplicationContainer} from "./containers/application/application.container";
import {NgModule} from "@angular/core";
import {AppSandbox} from "./app.sandbox";
import {Store} from "@ngrx/store";
import {CommonLogicModule} from "../common/index";
import {StockModule} from "../stock/index";
import {AuthenticationModule} from "../authentication/index";
import {AboutModule} from "../about/index";
import {XHRBackend, RequestOptions, Http} from "@angular/http";
import {customHttpFactory} from "./customHttp";

@NgModule({
    imports: [BrowserModule, AboutModule, AuthenticationModule, CommonLogicModule, StockModule, routing],
    declarations: [ApplicationContainer],
    exports: [ApplicationContainer],
    providers: [
        AppSandbox,
        {
            provide: Http,
            useFactory: customHttpFactory,
            deps: [XHRBackend, RequestOptions, Store]
        }
    ]
})
export class AppModule {
}