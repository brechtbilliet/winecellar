import {type} from "../../util/util";
import {Action} from "@ngrx/store";
import {Wine} from "../../../stock/entities/Wine";
export const ActionTypes = {
    WINES_ADD: type("DATA_WINES_ADD"),
    WINES_REMOVE: type("DATA_WINES_REMOVE"),
    WINES_UPDATE: type("DATA_WINES_UPDATE"),
    WINES_UPDATE_RATE: type("DATA_WINES_UPDATE_RATE"),
    WINES_UPDATE_STOCK: type("DATA_WINES_UPDATE_STOCK"),
    WINES_SET_ALL: type("DATA_WINES_ADD_ALL"),
}

export class AddWine implements Action {
    type = ActionTypes.WINES_ADD;
    payload: {wine: Wine};

    constructor(wine: Wine){
        this.payload = {wine};
    }
}

export class RemoveWine implements Action {
    type = ActionTypes.WINES_REMOVE;
    payload: {_id: string};

    constructor(_id: string){
        this.payload = {_id};
    }
}

export class UpdateWine implements Action {
    type = ActionTypes.WINES_UPDATE;
    payload: {_id: string, wine: Wine};

    constructor(_id: string, wine: Wine){
        this.payload = {_id, wine};
    }
}

export class UpdateRate implements Action {
    type = ActionTypes.WINES_UPDATE_RATE;
    payload: {_id: string, myRating: number};

    constructor(_id: string, myRating: number){
        this.payload = {_id, myRating};
    }
}

export class UpdateStock implements Action {
    type = ActionTypes.WINES_UPDATE_STOCK;
    payload: {_id: string, myStock: number};

    constructor(_id: string, myStock: number){
        this.payload = {_id, myStock};
    }
}

export class SetAllWines implements Action {
    type = ActionTypes.WINES_SET_ALL;
    payload: {wines: Wine[]};

    constructor(wines: Wine[]){
        this.payload = {wines};
    }
}

export type Actions =
    AddWine
    | RemoveWine
    | UpdateWine
    | UpdateStock
    | UpdateRate
    | SetAllWines;
