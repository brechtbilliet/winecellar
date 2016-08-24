import {Action} from "@ngrx/store";
import {CollapsableSidebarContainerState} from "../../state/ContainersState";
import {CONTAINER_COLLAPSABLESIDEBAR_TOGGLE} from "../../actionTypes";

let initialState: CollapsableSidebarContainerState = {
    isCollapsed: false
};

export function collapsableSidebarReducer(state: CollapsableSidebarContainerState = initialState,
                                          action: Action): CollapsableSidebarContainerState {
    switch (action.type) {
        case CONTAINER_COLLAPSABLESIDEBAR_TOGGLE:
            return {
                isCollapsed: !state.isCollapsed
            };
        default:
            return state;
    }
};