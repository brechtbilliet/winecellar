import {CollapsableSidebarContainerState} from "../../state/ContainersState";
import * as sidebar from "../../actions/containers/sidebar";

let initialState: CollapsableSidebarContainerState = {
    isCollapsed: false
};

export function collapsableSidebarReducer(state: CollapsableSidebarContainerState = initialState,
                                          action: sidebar.Actions): CollapsableSidebarContainerState {
    switch (action.type) {
        case sidebar.ActionTypes.TOGGLE_SIDEBAR:
            return {
                isCollapsed: !state.isCollapsed
            };
        default:
            return state;
    }
};