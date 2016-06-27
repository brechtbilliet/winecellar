import {Action} from "@ngrx/store";
import {CollapsableSidebarContainerState} from "../../state/ContainersState";
import {CONTAINER_COLLAPSABLESIDEBAR_TOGGLE} from "../../actionTypes";
export function collapsableSidebarReducer(state: CollapsableSidebarContainerState = {isCollapsed: false},
                                          action: Action = null): CollapsableSidebarContainerState {
    switch (action.type) {
        case CONTAINER_COLLAPSABLESIDEBAR_TOGGLE:
            return {
                isCollapsed: !state.isCollapsed
            };
        default:
            return state;
    }
};