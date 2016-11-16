import {CollapsableSidebarContainerState} from "../../state/ContainersState";
import {collapsableSidebarReducer} from "./collapsable-sidebar.reducer";
import {ToggleSidebar} from "../../actions/containers/sidebar";
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
});