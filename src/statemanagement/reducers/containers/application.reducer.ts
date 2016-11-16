import {ApplicationContainerState} from "../../state/ContainersState";
import * as application from "../../actions/containers/application";

let initialState: ApplicationContainerState = {
    isBusy: false
};

export function applicationReducer(state: ApplicationContainerState = initialState,
                                   action: application.Actions): ApplicationContainerState {
    switch (action.type) {
        case application.ActionTypes.ENABLE_BUSY_FLAG:
            return {
                isBusy: true
            };
        case application.ActionTypes.DISABLE_BUSY_FLAG:
            return {
                isBusy: false
            };
        default:
            return state;
    }
};