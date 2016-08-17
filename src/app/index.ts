import {instrumentStore} from "@ngrx/store-devtools";
import {routing} from "./routes";
import {AuthenticatedGuard} from "../common/authenticated.guard";
import {BrowserModule} from "@angular/platform-browser";
import {WineCellarApp} from "./containers/application/application.container";
import {NgModule} from "@angular/core";
import {useLogMonitor, StoreLogMonitorComponent} from "@ngrx/store-log-monitor";
import {ApplicationSandbox} from "./sandboxes/application.sandbox";
import {store} from "../common/store";
import {StoreModule} from "@ngrx/store";
import {CommonLogicModule} from "../common/index";
import {StockModule} from "../stock/index";
import {AuthenticationModule} from "../authentication/index";
import {AboutModule} from "../about/index";
@NgModule({
    imports: [BrowserModule, StoreModule.provideStore(store), AboutModule, AuthenticationModule, CommonLogicModule, StockModule, routing],
    declarations: [WineCellarApp, StoreLogMonitorComponent],
    bootstrap: [WineCellarApp],
    providers: [
        AuthenticatedGuard,
        ApplicationSandbox,
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