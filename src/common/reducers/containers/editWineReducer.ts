import {Reducer, Action} from "@ngrx/store";
import * as _ from "lodash";
import {CONTAINER_EDITWINEPAGE_SET_WINE, CONTAINER_EDITWINEPAGE_CLEAR_WINE} from "../../actionTypes";
import {INITIAL_STATE} from "../../state/initialState";
import {EditWineContainerState} from "../../state/ContainersState";
export const editWineReducer: Reducer<EditWineContainerState> = (state: EditWineContainerState = INITIAL_STATE.containers.editWinePage,
                                                                 action: Action = null) => {
    switch (action.type) {
        case CONTAINER_EDITWINEPAGE_SET_WINE:
            return <EditWineContainerState>_.assign({}, state, {
                wine: action.payload
            });
        case CONTAINER_EDITWINEPAGE_CLEAR_WINE:
            return <EditWineContainerState>_.assign({}, state, {
                wine: null
            });
        default:
            return state;
    }
};