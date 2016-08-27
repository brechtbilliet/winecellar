import {
    DATA_WINES_ADD,
    DATA_AUTHENTICATION_SET_AUTHENTICATION,
    DATA_AUTHENTICATION_CLEAR_AUTHENTICATION,
    DATA_WINES_ADD_ALL,
    DATA_WINES_REMOVE,
    DATA_WINES_UPDATE,
    DATA_WINES_UPDATE_RATE,
    DATA_WINES_UPDATE_STOCK,
    CONTAINER_APPLICATION_ENABLE_BUSY_FLAG,
    CONTAINER_APPLICATION_DISABLE_BUSY_FLAG,
    CONTAINER_COLLAPSABLESIDEBAR_TOGGLE
} from "./actionTypes";
import {Action} from "@ngrx/store";
import {AuthenticationResult} from "../authentication/types/AuthenticationResult";
import {Wine} from "../stock/entities/Wine";
export function setAuthentication(authenticationResult: AuthenticationResult): Action {
    return {
        type: DATA_AUTHENTICATION_SET_AUTHENTICATION,
        payload: authenticationResult
    };
}

export function clearAuthentication(): Action {
    return {
        type: DATA_AUTHENTICATION_CLEAR_AUTHENTICATION
    };
}

export function addWine(wine: Wine): Action {
    return {
        type: DATA_WINES_ADD,
        payload: {wine}
    };
}
export function addAllWines(wines: Array<Wine>): Action {
    return {
        type: DATA_WINES_ADD_ALL,
        payload: {wines}
    };
}
export function removeWine(_id: string): Action {
    return {
        type: DATA_WINES_REMOVE,
        payload: {_id}
    };
}

export function updateWine(_id: string, wine: Wine): Action {
    return {
        type: DATA_WINES_UPDATE,
        payload: {wine, _id}
    };
}
export function updateRateWine(_id: string, myRating: number): Action {
    return {
        type: DATA_WINES_UPDATE_RATE,
        payload: {_id, myRating}
    };
}
export function updateStockWine(_id: string, inStock: number): Action {
    return {
        type: DATA_WINES_UPDATE_STOCK,
        payload: {_id, inStock}
    };
}

export function enableBusy(): Action {
    return {
        type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG
    };
}

export function disableBusy(): Action {
    return {
        type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
    };
}

export function toggleSidebar(): Action {
    return {
        type: CONTAINER_COLLAPSABLESIDEBAR_TOGGLE
    };
}