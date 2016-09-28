import {collapsableSidebarReducer} from "./reducers/containers/collapsable-side.reducer";
import {authenticationReducer} from "./reducers/data/authentication.reducer";
import {winesReducer} from "./reducers/data/wines.reducer";
import {applicationReducer} from "./reducers/containers/application.reducer";
import {combineReducers} from "@ngrx/store";
let dataReducers = combineReducers({
    authentication: authenticationReducer,
    wines: winesReducer
});
let containersReducers = combineReducers({
    collapsableSidebar: collapsableSidebarReducer,
    application: applicationReducer
});
let productionReducer = combineReducers({
    data: dataReducers,
    containers: containersReducers
});

export function rootReducer(state: any, action: any) {
    return productionReducer(state, action);
}