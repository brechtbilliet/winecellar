import {routing} from "./routes";
import {BrowserModule} from "@angular/platform-browser";
import {ApplicationContainer} from "./containers/application/application.container";
import {NgModule} from "@angular/core";
import {AppSandbox} from "./app.sandbox";
import {StoreModule, Store} from "@ngrx/store";
import {CommonLogicModule} from "../common/index";
import {StockModule} from "../stock/index";
import {AuthenticationModule} from "../authentication/index";
import {AboutModule} from "../about/index";
import {XHRBackend, RequestOptions, Http} from "@angular/http";
import {CustomHttp} from "./customHttp";
import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {StoreLogMonitorModule, useLogMonitor} from "@ngrx/store-log-monitor";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {rootReducer} from "../statemanagement/rootReducer";
import {handleUndo} from "./handleUndo.reducer";

@NgModule({
    imports: [BrowserModule, StoreModule.provideStore(handleUndo(rootReducer)),
        AboutModule, AuthenticationModule, CommonLogicModule, StockModule, routing, StoreLogMonitorModule,
        StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible: false,
                position: "right"
            })
        })],
    declarations: [ApplicationContainer],
    bootstrap: [ApplicationContainer],
    providers: [
        AppSandbox,
        {
            provide: Http,
            useFactory: (backend: XHRBackend,
                         defaultOptions: RequestOptions,
                         store: Store<ApplicationState>) => new CustomHttp(backend, defaultOptions, store),
            deps: [XHRBackend, RequestOptions, Store]
        }
    ]
})
export class AppModule {
}