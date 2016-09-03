import {collapsableSidebarReducer} from "./reducers/containers/collapsable-side.reducer";
import {authenticationReducer} from "./reducers/data/authentication.reducer";
import {winesReducer} from "./reducers/data/wines.reducer";
import {applicationReducer} from "./reducers/containers/application.reducer";
import {combineReducers} from "@ngrx/store";
export let rootReducer = {
    data: combineReducers({
        authentication: authenticationReducer,
        wines: winesReducer
    }),
    containers: combineReducers({
        collapsableSidebar: collapsableSidebarReducer,
        application: applicationReducer
    })
};
