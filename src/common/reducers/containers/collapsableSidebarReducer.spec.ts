import {it, describe, expect} from "angular2/testing";
import {CollapsableSidebarContainerState} from "../../state/ContainersState";
import {collapsableSidebarReducer} from "./collapsableSidebarReducer";
import {CONTAINER_COLLAPSABLESIDEBAR_TOGGLE} from "../../actionTypes";
describe("reducer: containers > collaspableSidebarReducer", () => {
    describe("case CONTAINER_COLLAPSABLESIDEBAR_TOGGLE", () => {
        it("should return a new state with a different isCollapsed value", () => {
            let initialState: CollapsableSidebarContainerState = {
                isCollapsed: false
            };
            let changedState: CollapsableSidebarContainerState =
                collapsableSidebarReducer(initialState, {type: CONTAINER_COLLAPSABLESIDEBAR_TOGGLE});
            expect(changedState).not.toBe(initialState);
            expect(changedState.isCollapsed).toBe(true);
            initialState = {
                isCollapsed: true
            };
            changedState = collapsableSidebarReducer(initialState, {type: CONTAINER_COLLAPSABLESIDEBAR_TOGGLE});
            expect(changedState.isCollapsed).toBe(false);

        });
    });
    describe("case default", () => {
        it("should return the exact same reference as before", () => {
            let initialState: CollapsableSidebarContainerState = {
                isCollapsed: false
            };
            let changedState: CollapsableSidebarContainerState = collapsableSidebarReducer(initialState, {type: null});
            expect(changedState).toBe(initialState);
        });
    });
});