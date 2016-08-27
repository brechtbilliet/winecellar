import {Action} from "@ngrx/store";
import {ApplicationContainerState} from "../../state/ContainersState";
import {CONTAINER_APPLICATION_DISABLE_BUSY_FLAG, CONTAINER_APPLICATION_ENABLE_BUSY_FLAG} from "../../actionTypes";

let initialState: ApplicationContainerState = {
      isBusy: false
};

export function applicationReducer(state: ApplicationContainerState = initialState,
                                   action: Action): ApplicationContainerState {
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