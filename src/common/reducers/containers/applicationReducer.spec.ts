import {applicationReducer} from "./applicationReducer";
import {ApplicationContainerState} from "../../state/ContainersState";
import {CONTAINER_APPLICATION_ENABLE_BUSY_FLAG, CONTAINER_APPLICATION_DISABLE_BUSY_FLAG} from "../../actionTypes";
import {it, describe, expect} from "angular2/testing";
describe("reducer: containers > applicationReducer", () => {
    describe("case CONTAINER_APPLICATION_ENABLE_BUSY_FLAG", () => {
        it("should return a new applicationstate with the isBusyflag to true", () => {
            let initialState: ApplicationContainerState = {
                isBusy: false
            };
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
            let changedState: ApplicationContainerState = applicationReducer(initialState, {type: null});
            expect(changedState).toBe(initialState);
        });
    });
});