import {Reducer, Action} from "@ngrx/store";
import * as _ from "lodash";
import {CONTAINER_COLLAPSABLESIDEBAR_TOGGLE} from "../../actionTypes";
import {INITIAL_STATE} from "../../state/initialState";
import {CollapsableSidebarContainerState} from "../../state/ContainersState";
export const collapsableSidebarReducer: Reducer<CollapsableSidebarContainerState> =
    (state: CollapsableSidebarContainerState = INITIAL_STATE.containers.collapsableSidebar,
     action: Action = null) => {
        switch (action.type) {
            case CONTAINER_COLLAPSABLESIDEBAR_TOGGLE:
                return <CollapsableSidebarContainerState> _.assign({}, state, {
                    isCollapsed: !state.isCollapsed
                });
            default:
                return state;
        }
    };