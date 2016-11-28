import {Action} from "@ngrx/store";
import * as wine from "../../actions/data/wine";
import {Wine} from "../../../stock/entities/Wine";

export function winesReducer(state: Array<Wine> = [],
                             action: wine.Actions): Array<Wine> {
    switch (action.type) {
        case wine.ActionTypes.WINES_ADD:
            return [...state, action.payload.wine];
        case wine.ActionTypes.WINES_SET_ALL:
            return [...action.payload.wines];
        case wine.ActionTypes.WINES_REMOVE:
            return state.filter(item => item._id !== action.payload._id);
        case wine.ActionTypes.WINES_UPDATE:
            return state.map(item => item._id === action.payload._id ? Object.assign({}, action.payload.wine) : item);
        case wine.ActionTypes.WINES_UPDATE_RATE:
            return state.map(item => item._id === action.payload._id ? Object.assign({}, item, {myRating: action.payload.myRating}) : item);
        case wine.ActionTypes.WINES_UPDATE_STOCK:
            return state.map(item => item._id === action.payload._id ? Object.assign({}, item, {inStock: action.payload.myStock}) : item);
        default:
            return state;
    }
};