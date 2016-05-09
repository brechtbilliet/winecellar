import {Reducer, Action} from "@ngrx/store";
import {INITIAL_STATE} from "../../state/initialState";
import {EditStockContainerState} from "../../state/ContainersState";
import {CONTAINER_EDITSTOCKPAGE_CLEAR_WINE, CONTAINER_EDITSTOCKPAGE_SET_WINE} from "../../actionTypes";
export const editStockReducer: Reducer<EditStockContainerState> = (state: EditStockContainerState = INITIAL_STATE.containers.editStockPage,
                                                                  action: Action = null) => {
    switch (action.type) {
        case CONTAINER_EDITSTOCKPAGE_SET_WINE:
            return <EditStockContainerState> Object.assign({}, state, {
                wine: action.payload
            });
        case CONTAINER_EDITSTOCKPAGE_CLEAR_WINE:
            return <EditStockContainerState> Object.assign({}, state, {
                wine: null
            });
        default:
            return state;
    }
};