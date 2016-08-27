import {Action} from "@ngrx/store";
import {
    DATA_WINES_REMOVE,
    DATA_WINES_ADD_ALL,
    DATA_WINES_UPDATE,
    DATA_WINES_UPDATE_RATE,
    DATA_WINES_UPDATE_STOCK,
    DATA_WINES_ADD
} from "../../actionTypes";
import {Wine} from "../../../stock/entities/Wine";
export function winesReducer(state: Array<Wine> = [],
                             action: Action = null): Array<Wine> {
    let _id: string, inStock: number, myRating: number, wine: Wine, wines: Array<Wine>;
    switch (action.type) {
        case DATA_WINES_ADD:
            ({wine} = action.payload);
            return [...state, wine];
        case DATA_WINES_ADD_ALL:
            ({wines} = action.payload);
            return [...wines];
        case DATA_WINES_REMOVE:
            ({_id} = action.payload);
            return state.filter(item => item._id !== _id);
        case DATA_WINES_UPDATE:
            ({wine, _id} = action.payload);
            return state.map(item => item._id === _id ? Object.assign({}, wine) : item);
        case DATA_WINES_UPDATE_RATE:
            ({_id, myRating} = action.payload);
            return state.map(item => item._id === _id ? Object.assign({}, item, {myRating}) : item);
        case DATA_WINES_UPDATE_STOCK:
            ({_id, inStock} = action.payload);
            return state.map(item => item._id === _id ? Object.assign({}, item, {inStock}) : item);
        default:
            return state;
    }
};