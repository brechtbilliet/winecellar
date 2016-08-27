import {Wine} from "../../../stock/entities/Wine";
import {winesReducer} from "./wines.reducer";
import * as _ from "lodash";
import {
    DATA_WINES_ADD,
    DATA_WINES_ADD_ALL,
    DATA_WINES_REMOVE,
    DATA_WINES_UPDATE,
    DATA_WINES_UPDATE_RATE,
    DATA_WINES_UPDATE_STOCK
} from "../../actionTypes";
let deepfreeze = require("deep-freeze");

describe("reducer > data", () => {
    describe("case DATA_WINES_ADD", () => {
        it("should return a new instance with the correct state", () => {
            let initialState: Array<Wine> = [];
            initialState.push(new Wine("initiaial", "wine"));
            let payload = {wine: new Wine()};
            deepfreeze(initialState);
            let changedState: Array<Wine> = winesReducer(initialState, {type: DATA_WINES_ADD, payload});
            expect(changedState).not.toBe(initialState);
            expect(changedState.length).toBe(2);
            expect(changedState[1]).toBe(payload.wine);
        });
    });
    describe("case DATA_WINES_ADD_ALL", () => {
        it("should return a new instance with the correct state", () => {
            let initialState: Array<Wine> = [];
            let payload = {wines: [new Wine(), new Wine(), new Wine()]};
            deepfreeze(initialState);
            let changedState: Array<Wine> = winesReducer(initialState, {type: DATA_WINES_ADD_ALL, payload});
            expect(changedState).not.toBe(initialState);
            _.each(payload.wines, (wine: Wine, index: number) => {
                expect(wine).toBe(changedState[index]);
            });
        });
    });
    describe("case DATA_WINES_REMOVE", () => {
        it("should return a new instance with the correct state", () => {
            let initialState: Array<Wine> = [new Wine(), new Wine(), new Wine()];
            initialState[0]._id = "fakeid1";
            initialState[1]._id = "fakeid2";
            initialState[2]._id = "fakeid3";
            deepfreeze(initialState);
            let changedState: Array<Wine> = winesReducer(initialState, {
                type: DATA_WINES_REMOVE,
                payload: {_id: initialState[0]._id}
            });
            expect(changedState).not.toBe(initialState);
            expect(changedState.length).toBe(2);
            expect(_.filter(changedState, (wine: Wine) => wine._id === initialState[0]._id).length).toBe(0);
        });
    });
    describe("case DATA_WINES_UPDATE", () => {
        it("should return a new instance with the correct state", () => {
            let initialState: Array<Wine> = [new Wine(), new Wine(), new Wine()];
            initialState[0]._id = "fakeid1";
            initialState[1]._id = "fakeid2";
            initialState[2]._id = "fakeid3";
            let updateWine: Wine = Object.assign({}, initialState[0], {
                name: "updated"
            });
            deepfreeze(initialState);
            let changedState: Array<Wine> = winesReducer(initialState, {
                type: DATA_WINES_UPDATE,
                payload: {_id: initialState[0]._id, wine: updateWine}
            });
            expect(changedState).not.toBe(initialState);
            expect(changedState[0]).not.toBe(initialState[0]);
            expect(changedState[0]).not.toBe(updateWine);
            expect(changedState[0]).toEqual(updateWine);
        });
    });
    describe("case DATA_WINES_UPDATE_RATE", () => {
        it("should return a new instance with the correct state", () => {
            let initialState: Array<Wine> = [new Wine(), new Wine(), new Wine()];
            initialState[0]._id = "fakeid1";
            initialState[1]._id = "fakeid2";
            initialState[2]._id = "fakeid3";
            let newRating: number = 5;
            deepfreeze(initialState);
            let changedState: Array<Wine> = winesReducer(initialState, {
                type: DATA_WINES_UPDATE_RATE,
                payload: {_id: initialState[0]._id, myRating: newRating}
            });
            expect(changedState).not.toBe(initialState);
            expect(changedState[0]).not.toBe(initialState[0]);
            expect(changedState[0].myRating).toBe(newRating);
        });
    });
    describe("case DATA_WINES_UPDATE_STOCK", () => {
        it("should return a new instance with the correct state", () => {
            let initialState: Array<Wine> = [new Wine(), new Wine(), new Wine()];
            initialState[0]._id = "fakeid1";
            initialState[1]._id = "fakeid2";
            initialState[2]._id = "fakeid3";
            let newInStock: number = 5;
            deepfreeze(initialState);
            let changedState: Array<Wine> = winesReducer(initialState, {
                type: DATA_WINES_UPDATE_STOCK,
                payload: {_id: initialState[0]._id, inStock: newInStock}
            });
            expect(changedState).not.toBe(initialState);
            expect(changedState[0]).not.toBe(initialState[0]);
            expect(changedState[0].inStock).toBe(newInStock);
        });
    });
    describe("case default", () => {
        it("should return the same state", () => {
            let initialState: Array<Wine> = [new Wine(), new Wine(), new Wine()];
            deepfreeze(initialState);
            let changedState: Array<Wine> = winesReducer(initialState, {type: null});
            expect(changedState).toBe(initialState);
        });
    });
});