import {NgModule, Component} from "@angular/core";
import {StoreLogMonitorModule, useLogMonitor} from "@ngrx/store-log-monitor";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {AppModule} from "../app";
import {handleUndoReducer} from "../statemanagement/handleUndoReducer";
import {StoreModule} from "@ngrx/store";

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
        StoreModule.provideStore(handleUndoReducer) , StoreLogMonitorModule, StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible: false,
                position: "right"
            })
        }), AppModule],
    declarations: [ApplicationWrapperContainer],
    bootstrap: [ApplicationWrapperContainer]
})
export class DevModule {
}
