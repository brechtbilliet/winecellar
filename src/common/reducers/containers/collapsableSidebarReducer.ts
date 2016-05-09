import {Reducer, Action} from "@ngrx/store";
import {INITIAL_STATE} from "../../state/initialState";
import {CollapsableSidebarContainerState} from "../../state/ContainersState";
import {CONTAINER_COLLAPSABLESIDEBAR_TOGGLE} from "../../actionTypes";
export const collapsableSidebarReducer: Reducer<CollapsableSidebarContainerState> =
    (state: CollapsableSidebarContainerState = INITIAL_STATE.containers.collapsableSidebar,
     action: Action = null) => {
        switch (action.type) {
            case CONTAINER_COLLAPSABLESIDEBAR_TOGGLE:
                return <CollapsableSidebarContainerState> Object.assign({}, state, {
                    isCollapsed: !state.isCollapsed
                });
            default:
                return state;
        }
    };