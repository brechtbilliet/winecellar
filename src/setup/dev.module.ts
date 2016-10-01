import {NgModule, Component} from "@angular/core";
import {StoreLogMonitorModule, useLogMonitor} from "@ngrx/store-log-monitor";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {AppModule} from "../app";
import {StoreModule} from "@ngrx/store";
import {rootReducer} from "../statemanagement/rootReducer";
import {StoreUndoModule} from "ngrx-undo"

@Component({
    selector: "application-wrapper",
    template: `   
        <application></application>
        <ngrx-store-log-monitor toggleCommand="ctrl-t" positionCommand="ctrl-m"></ngrx-store-log-monitor>
`
})
export class ApplicationWrapperContainer {
}

@NgModule({
    imports: [
        StoreModule.provideStore(rootReducer), StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible: false,
                position: "right"
            })
        }), StoreUndoModule.interceptStore({bufferSize: 100}), StoreLogMonitorModule, AppModule],
    declarations: [ApplicationWrapperContainer],
    bootstrap: [ApplicationWrapperContainer]
})
export class DevModule {
}
