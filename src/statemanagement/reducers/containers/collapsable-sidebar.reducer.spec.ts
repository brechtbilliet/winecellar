import {CollapsableSidebarContainerState} from "../../state/ContainersState";
import {collapsableSidebarReducer} from "./collapsable-sidebar.reducer";
import {ToggleSidebar} from "../../actions/containers/sidebar";
import {Dispatcher} from "@ngrx/store";
let deepfreeze = require("deep-freeze");

describe("reducer: containers > collaspableSidebarReducer", () => {
    describe("case CONTAINER_COLLAPSABLESIDEBAR_TOGGLE", () => {
        it("should return a new state with a different isCollapsed value", () => {
            let initialState: CollapsableSidebarContainerState = {
                isCollapsed: false
            };
            deepfreeze(initialState);
            let changedState: CollapsableSidebarContainerState =
                collapsableSidebarReducer(initialState, new ToggleSidebar());
            expect(changedState).not.toBe(initialState);
            expect(changedState.isCollapsed).toBe(true);
            initialState = {
                isCollapsed: true
            };
            changedState = collapsableSidebarReducer(initialState, new ToggleSidebar());
            expect(changedState.isCollapsed).toBe(false);

        });
    });
    describe("case default", () => {
        it("should return the exact same reference as before", () => {
            let initialState: CollapsableSidebarContainerState = {
                isCollapsed: false
            };
            deepfreeze(initialState);
            let changedState: CollapsableSidebarContainerState = collapsableSidebarReducer(initialState, {type: null}) as any;
            expect(changedState).toBe(initialState);
        });
    });
    describe("case @ngrx/store/init", () => {
        it("should return the default value for the state param", () => {
            let changedState: CollapsableSidebarContainerState = collapsableSidebarReducer(undefined, {type: Dispatcher.INIT} as any);
            expect(changedState.isCollapsed).toBeFalsy();
        });
    });
})
;