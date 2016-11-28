import {Wine} from "../../../stock/entities/Wine";
import {winesReducer} from "./wines.reducer";
import * as _ from "lodash";
import {AddWine, SetAllWines, RemoveWine, UpdateWine, UpdateRate, UpdateStock} from "../../actions/data/wine";
let deepfreeze = require("deep-freeze");

describe("reducer > data", () => {
    describe("case DATA_WINES_ADD", () => {
        it("should return a new instance with the correct state", () => {
            let initialState: Array<Wine> = [];
            initialState.push(new Wine("initiaial", "wine"));
            deepfreeze(initialState);
            let wine: Wine = new Wine();
            let changedState: Array<Wine> = winesReducer(initialState, new AddWine(wine));
            expect(changedState).not.toBe(initialState);
            expect(changedState.length).toBe(2);
            expect(changedState[1]).toBe(wine);
        });
    });
    describe("case DATA_WINES_ADD_ALL", () => {
        it("should return a new instance with the correct state", () => {
            let initialState: Array<Wine> = [];
            let wines: Wine[] = [new Wine(), new Wine(), new Wine()];
            deepfreeze(initialState);
            let changedState: Array<Wine> = winesReducer(initialState, new SetAllWines(wines));
            expect(changedState).not.toBe(initialState);
            _.each(wines, (wine: Wine, index: number) => {
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
            let changedState: Array<Wine> = winesReducer(initialState,
                new RemoveWine("fakeid1"));
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
            let changedState: Array<Wine> = winesReducer(initialState,
                new UpdateWine("fakeid1", updateWine)
            );
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
            let changedState: Array<Wine> = winesReducer(initialState,
                new UpdateRate("fakeid1", newRating)
            );
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
            let changedState: Array<Wine> = winesReducer(initialState,
                new UpdateStock("fakeid1", newInStock)
            );
            expect(changedState).not.toBe(initialState);
            expect(changedState[0]).not.toBe(initialState[0]);
            expect(changedState[0].inStock).toBe(newInStock);
        });
    });
    describe("case default", () => {
        it("should return the same state", () => {
            let initialState: Array<Wine> = [new Wine(), new Wine(), new Wine()];
            deepfreeze(initialState);
            let changedState: Array<Wine> = winesReducer(initialState, {type: null} as any);
            expect(changedState).toBe(initialState);
        });
    });
});