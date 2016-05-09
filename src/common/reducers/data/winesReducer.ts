import {Reducer, Action} from "@ngrx/store";
import {Wine} from "../../../stock/entities/Wine";
import {INITIAL_STATE} from "../../state/initialState";
import {
    DATA_WINES_ADD,
    DATA_WINES_ADD_ALL,
    DATA_WINES_REMOVE,
    DATA_WINES_UPDATE,
    DATA_WINES_UPDATE_RATE,
    DATA_WINES_UPDATE_STOCK
} from "../../actionTypes";
export const winesReducer: Reducer<Array<Wine>> = (state: Array<Wine> = INITIAL_STATE.data.wines,
                                                   action: Action = null) => {
    switch (action.type) {
        case DATA_WINES_ADD:
            return [...state, action.payload];
        case DATA_WINES_ADD_ALL:
            return [...action.payload];
        case DATA_WINES_REMOVE:
            return state.filter((item: Wine) => item._id !== action.payload);
        case DATA_WINES_UPDATE:
            return state.map((item: Wine) => {
                return item._id === action.payload._id ? Object.assign({}, action.payload.wine, {}) : item;
            });
        case DATA_WINES_UPDATE_RATE:
            return <Array<Wine>> state.map((item: Wine) => {
                return item._id === action.payload._id ? Object.assign({}, item, {
                    myRating: action.payload.myRating
                }) : item;
            });
        case DATA_WINES_UPDATE_STOCK:
            return <Array<Wine>> state.map((item: Wine) => {
                return item._id === action.payload._id ? Object.assign({}, item, {
                    inStock: action.payload.inStock
                }) : item;
            });
        default:
            return state;
    }
};