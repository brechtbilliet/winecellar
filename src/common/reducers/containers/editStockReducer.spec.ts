import {editStockReducer} from "./editStockReducer";
import {Wine} from "../../../stock/entities/Wine";
import {EditStockContainerState} from "../../state/ContainersState";
import {CONTAINER_EDITSTOCKPAGE_SET_WINE, CONTAINER_EDITSTOCKPAGE_CLEAR_WINE} from "../../actionTypes";
let deepfreeze = require('deep-freeze');

describe("reducer: containers > editStockReducer", () => {
    describe("case CONTAINER_EDITSTOCKPAGE_SET_WINE", () => {
        it("should return a new state with the correct wine", () => {
            let wine: Wine = new Wine("", "", "", 0, 0, 0);
            let initialState: EditStockContainerState = {
                wine: null
            };
            deepfreeze(initialState);
            let changedState: EditStockContainerState =
                editStockReducer(initialState, {type: CONTAINER_EDITSTOCKPAGE_SET_WINE, payload: wine});
            expect(initialState).not.toBe(changedState);
            expect(changedState.wine).toBe(wine);
        });
    });
    describe("case CONTAINER_EDITSTOCKPAGE_CLEAR_WINE", () => {
        it("should return a new state with the wine cleared", () => {
            let wine: Wine = new Wine("", "", "", 0, 0, 0);
            let initialState: EditStockContainerState = {
                wine: wine
            };
            deepfreeze(initialState);
            let changedState: EditStockContainerState = editStockReducer(initialState, {type: CONTAINER_EDITSTOCKPAGE_CLEAR_WINE});
            expect(initialState).not.toBe(changedState);
            expect(changedState.wine).toBe(null);
        });
    });
    describe("case default", () => {
        it("should return the exact same reference as before", () => {
            let initialState: EditStockContainerState = {
                wine: null
            };
            deepfreeze(initialState);
            let changedState: EditStockContainerState = editStockReducer(initialState, {type: null});
            expect(changedState).toBe(initialState);
        });
    });
});