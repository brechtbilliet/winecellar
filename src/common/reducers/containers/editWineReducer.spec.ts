import {it, describe, expect} from "angular2/testing";
import {editWineReducer} from "./editWineReducer";
import {EditWineContainerState} from "../../state/ContainersState";
import {CONTAINER_EDITWINEPAGE_SET_WINE, CONTAINER_EDITWINEPAGE_CLEAR_WINE} from "../../actionTypes";
import {Wine} from "../../../stock/entities/Wine";
describe("reducer: containers > editWineReducer", () => {
    describe("case CONTAINER_EDITWINEPAGE_SET_WINE", () => {
        it("should return a new state with the correct wine", () => {
            let wine: Wine = new Wine("", "", "", 0, 0, 0);
            let initialState: EditWineContainerState = {
                wine: null
            }
            let changedState: EditWineContainerState =
                editWineReducer(initialState, {type: CONTAINER_EDITWINEPAGE_SET_WINE, payload: wine});
            expect(initialState).not.toBe(changedState);
            expect(changedState.wine).toBe(wine);
        });
    });
    describe("case CONTAINER_EDITWINEPAGE_CLEAR_WINE", () => {
        it("should return a new state with the wine cleared", () => {
            let wine: Wine = new Wine("", "", "", 0, 0, 0);
            let initialState: EditWineContainerState = {
                wine: wine
            }
            let changedState: EditWineContainerState = editWineReducer(initialState, {type: CONTAINER_EDITWINEPAGE_CLEAR_WINE});
            expect(initialState).not.toBe(changedState);
            expect(changedState.wine).toBe(null);
        });
    });
    describe("case default", () => {
        it("should return the exact same reference as before", () => {
            let initialState: EditWineContainerState = {
                wine: null
            };
            let changedState: EditWineContainerState = editWineReducer(initialState, {type: null});
            expect(changedState).toBe(initialState);
        });
    });
});