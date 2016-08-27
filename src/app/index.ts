import {routing} from "./routes";
import {BrowserModule} from "@angular/platform-browser";
import {ApplicationContainer} from "./containers/application/application.container";
import {NgModule} from "@angular/core";
import {StoreLogMonitorComponent} from "@ngrx/store-log-monitor";
import {AppSandbox} from "./app.sandbox";
import {store} from "../common/store";
import {StoreModule} from "@ngrx/store";
import {CommonLogicModule} from "../common/index";
import {StockModule} from "../stock/index";
import {AuthenticationModule} from "../authentication/index";
import {AboutModule} from "../about/index";
import {instrumentStore} from "@ngrx/store-devtools";
import {useLogMonitor} from "@ngrx/store-log-monitor";
@NgModule({
    imports: [BrowserModule, StoreModule.provideStore(store), AboutModule, AuthenticationModule, CommonLogicModule, StockModule, routing],
    declarations: [ApplicationContainer, StoreLogMonitorComponent],
    bootstrap: [ApplicationContainer],
    providers: [
        AppSandbox,
        // instrumentStore({
        //     monitor: useLogMonitor({
        //         visible: false,
        //         position: "right"
        //     })
        // })
    ]
})
export class AppModule {
}