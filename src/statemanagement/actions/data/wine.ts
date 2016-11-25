import {type} from "../../util/util";
import {Action} from "@ngrx/store";
import {Wine} from "../../../stock/entities/Wine";
export const ActionTypes = {
    WINES_ADD: type("[Wine] addWine"),
    WINES_REMOVE: type("[Wine] removeWine"),
    WINES_UPDATE: type("[Wine] updateWine"),
    WINES_UPDATE_RATE: type("[Wine] updateRate"),
    WINES_UPDATE_STOCK: type("[Wine] updateStock"),
    WINES_ADD_ALL: type("[Wine] addAllWines"),
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

export class AddAllWines implements Action {
    type = ActionTypes.WINES_ADD_ALL;
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
    | AddAllWines;
