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
                             action: Action): Array<Wine> {
    let _id: string, wine: Wine, wines: Array<Wine>;
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
        case DATA_WINES_UPDATE_STOCK:
            ({_id} = action.payload);
            return state.map(item =>item._id === _id ? wineReducer(item, action) : item);
        default:
            return state;
    }
};

function wineReducer(state: Wine, action: Action) {
    let wine: Wine, myRating: number, inStock: number;
    switch (action.type) {
        case DATA_WINES_UPDATE_RATE:
            ({wine, myRating} = action.payload);
            return Object.assign({}, wine, {myRating: myRating});
        case DATA_WINES_UPDATE_STOCK:
            ({wine, inStock} = action.payload);
            return Object.assign({}, wine, {inStock: inStock});
        default:
            return state;
    }
}