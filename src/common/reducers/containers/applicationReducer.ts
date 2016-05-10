import {Reducer, Action} from "@ngrx/store";
import {INITIAL_STATE} from "../../state/initialState";
import {ApplicationContainerState} from "../../state/ContainersState";
import {CONTAINER_APPLICATION_DISABLE_BUSY_FLAG, CONTAINER_APPLICATION_ENABLE_BUSY_FLAG} from "../../actionTypes";

export const applicationReducer:Reducer<ApplicationContainerState> =
    (state:ApplicationContainerState = INITIAL_STATE.containers.application, action:Action) => {
        switch (action.type) {
            case CONTAINER_APPLICATION_ENABLE_BUSY_FLAG:
                return {
                    isBusy: true
                };
            case CONTAINER_APPLICATION_DISABLE_BUSY_FLAG:
                return {
                    isBusy: false
                };
            default:
                return state;
        }
    };