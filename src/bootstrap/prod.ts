import {NgModule, CUSTOM_ELEMENTS_SCHEMA, Component} from "@angular/core";
import {AppModule} from "../app";
import {StoreModule} from "@ngrx/store";
import {rootReducer} from "../statemanagement/rootReducer";
import {StoreUndoModule} from "ngrx-undo"

@Component({
    selector: "application-wrapper",
    template: `   
        <application></application>
`
})
export class ApplicationWrapperContainer {
}

@NgModule({
    imports: [StoreModule.provideStore(rootReducer), StoreUndoModule.interceptStore({bufferSize: 100}), AppModule],
    declarations: [ApplicationWrapperContainer],
    bootstrap: [ApplicationWrapperContainer],
    schemas: [CUSTOM_ELEMENTS_SCHEMA,]
})
export class ProdModule {
}