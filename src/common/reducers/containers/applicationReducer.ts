import {Reducer, Action} from "@ngrx/store";
import {CONTAINER_APPLICATION_ENABLE_BUSY_FLAG, CONTAINER_APPLICATION_DISABLE_BUSY_FLAG} from "../../actionTypes";
import * as _ from "lodash";
import {INITIAL_STATE} from "../../state/initialState";
import {ApplicationContainerState} from "../../state/ContainersState";

export const applicationReducer: Reducer<ApplicationContainerState> =
    (state: ApplicationContainerState = INITIAL_STATE.containers.application, action: Action) => {
        switch (action.type) {
            case CONTAINER_APPLICATION_ENABLE_BUSY_FLAG:
                return <ApplicationContainerState>_.assign({}, state, {
                    isBusy: true
                });
            case CONTAINER_APPLICATION_DISABLE_BUSY_FLAG:
                return <ApplicationContainerState>_.assign({}, state, {
                    isBusy: false
                });
            default:
                return state;
        }
    };