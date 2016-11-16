import {applicationReducer} from "./application.reducer";
import {ApplicationContainerState} from "../../state/ContainersState";
import {EnableBusyFlag, DisableBusyFlag} from "../../actions/containers/application";
let deepfreeze = require("deep-freeze");

describe("reducer: containers > applicationReducer", () => {
    describe("case CONTAINER_APPLICATION_ENABLE_BUSY_FLAG", () => {
        it("should return a new applicationstate with the isBusyflag to true", () => {
            let initialState: ApplicationContainerState = {
                isBusy: false
            };
            deepfreeze(initialState);
            let changedState: ApplicationContainerState = applicationReducer(initialState, new EnableBusyFlag());
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
            let changedState: ApplicationContainerState = applicationReducer(initialState, new DisableBusyFlag());
            expect(initialState).not.toBe(changedState);
            expect(changedState.isBusy).toBe(false);
        });
    });
});