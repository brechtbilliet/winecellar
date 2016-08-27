import {applicationReducer} from "./application.reducer";
import {ApplicationContainerState} from "../../state/ContainersState";
import {CONTAINER_APPLICATION_ENABLE_BUSY_FLAG, CONTAINER_APPLICATION_DISABLE_BUSY_FLAG} from "../../actionTypes";
import {Dispatcher} from "@ngrx/store";
let deepfreeze = require("deep-freeze");

describe("reducer: containers > applicationReducer", () => {
    describe("case CONTAINER_APPLICATION_ENABLE_BUSY_FLAG", () => {
        it("should return a new applicationstate with the isBusyflag to true", () => {
            let initialState: ApplicationContainerState = {
                isBusy: false
            };
            deepfreeze(initialState);
            let changedState: ApplicationContainerState = applicationReducer(initialState, {type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
            expect(initialState).not.toBe(changedState);
            expect(changedState.isBusy).toBe(true);
        });
    });
    describe("case CONTAINER_APPLICATION_DISABLE_BUSY_FLAG", () => {
        it("should return a new applicationstate with the isBusyflag to true", () => {
            let initialState: ApplicationContainerState = {
                isBusy: false
            };
            deepfreeze(initialState);
            let changedState: ApplicationContainerState = applicationReducer(initialState, {type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
            expect(initialState).not.toBe(changedState);
            expect(changedState.isBusy).toBe(false);
        });
    });
    describe("case default", () => {
        it("should return the exact same reference as before", () => {
            let initialState: ApplicationContainerState = {
                isBusy: false
            };
            deepfreeze(initialState);
            let changedState: ApplicationContainerState = applicationReducer(initialState, {type: null});
            expect(changedState).toBe(initialState);
        });
    });
    describe("case @ngrx/store/init", () => {
        it("should return the default value for the state param", () => {
            let changedState: ApplicationContainerState = applicationReducer(undefined, {type: Dispatcher.INIT});
            expect(changedState.isBusy).toBeFalsy();
        });
    });
});