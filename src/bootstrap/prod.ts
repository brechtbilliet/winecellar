import {NgModule, CUSTOM_ELEMENTS_SCHEMA, Component} from "@angular/core";
import {AppModule} from "../app";
import {StoreModule} from "@ngrx/store";
import {handleUndoReducer} from "../statemanagement/handleUndoReducer";

@Component({
    selector: "application-wrapper",
    template: `   
        <application></application>
`
})
export class ApplicationWrapperContainer {
}

@NgModule({
    imports: [StoreModule.provideStore(handleUndoReducer), AppModule],
    declarations: [ApplicationWrapperContainer],
    bootstrap: [ApplicationWrapperContainer],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProdModule {
}