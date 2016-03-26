import {WineSearchContainerState} from "../../state/ContainersState";
import {Product} from "../../../stock/WineComApiTypes";
import {wineSearchReducer} from "./wineSearchReducer";
import {CONTAINER_WINESEARCH_UPDATE_FOUND_WINES, CONTAINER_WINESEARCH_CLEAR_FOUND_WINES} from "../../actionTypes";
import {it, describe, expect} from "angular2/testing";
describe("reducer: containers > wineSearchReducer", () => {
    describe("case CONTAINER_WINESEARCH_UPDATE_FOUND_WINES", () => {
        it("should return a new instance with the foundWines that where passed", () => {
            let initialState: WineSearchContainerState = {
                foundWines: []
            };
            let payload: Array<Product> = [
                null, null
            ]
            let changedState: WineSearchContainerState =
                wineSearchReducer(initialState, {type: CONTAINER_WINESEARCH_UPDATE_FOUND_WINES, payload});
            expect(changedState).not.toBe(initialState);
            expect(changedState.foundWines).toBe(payload);
        });
    });
    describe("case CONTAINER_WINESEARCH_CLEAR_FOUND_WINES", () => {
        it("should return a new instance with the foundWines cleared", () => {
            let initialState: WineSearchContainerState = {
                foundWines: [null, null]
            };
            let changedState: WineSearchContainerState =
                wineSearchReducer(initialState, {type: CONTAINER_WINESEARCH_CLEAR_FOUND_WINES});
            expect(changedState).not.toBe(initialState);
            expect(changedState.foundWines.length).toBe(0);
        });
    });
    describe("case default", () => {
        it("should return the same state", () => {
            let initialState: WineSearchContainerState = {
                foundWines: [null, null]
            };
            let changedState: WineSearchContainerState = wineSearchReducer(initialState, {type: null});
            expect(changedState).toBe(initialState);
        });
    });
});