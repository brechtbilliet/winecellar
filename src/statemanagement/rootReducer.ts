import {collapsableSidebarReducer} from "./reducers/containers/collapsable-side.reducer";
import {authenticationReducer} from "./reducers/data/authentication.reducer";
import {winesReducer} from "./reducers/data/wines.reducer";
import {applicationReducer} from "./reducers/containers/application.reducer";
import {
    DATA_AUTHENTICATION_CLEAR_AUTHENTICATION,
    DATA_AUTHENTICATION_SET_AUTHENTICATION,
    DATA_WINES_ADD,
    DATA_WINES_ADD_ALL,
    DATA_WINES_REMOVE,
    DATA_WINES_UPDATE,
    DATA_WINES_UPDATE_RATE,
    DATA_WINES_UPDATE_STOCK,
    CONTAINER_COLLAPSABLESIDEBAR_TOGGLE,
    CONTAINER_APPLICATION_DISABLE_BUSY_FLAG,
    CONTAINER_APPLICATION_ENABLE_BUSY_FLAG
} from "./actionTypes";
import {createReducerTree} from "create-reducer-tree";

let reducerComposer: any = {
    data: {
        authentication: {
            initialState: {
                isAuthenticated: false,
                jwtToken: "",
                account: null
            },
            actions: [
                DATA_AUTHENTICATION_SET_AUTHENTICATION,
                DATA_AUTHENTICATION_CLEAR_AUTHENTICATION
            ],
            reducer: authenticationReducer
        },
        wines: {
            initialState: [],
            actions: [
                DATA_WINES_ADD,
                DATA_WINES_ADD_ALL,
                DATA_WINES_REMOVE,
                DATA_WINES_UPDATE,
                DATA_WINES_UPDATE_RATE,
                DATA_WINES_UPDATE_STOCK
            ],
            reducer: winesReducer
        }
    },
    containers: {
        collapsableSidebar: {
            initialState: {isCollapsed: false},
            actions: [CONTAINER_COLLAPSABLESIDEBAR_TOGGLE],
            reducer: collapsableSidebarReducer
        },
        application: {
            initialState: {isBusy: false},
            actions: [CONTAINER_APPLICATION_ENABLE_BUSY_FLAG, CONTAINER_APPLICATION_DISABLE_BUSY_FLAG],
            reducer: applicationReducer
        }
    }
};

export let rootReducer = createReducerTree(reducerComposer);