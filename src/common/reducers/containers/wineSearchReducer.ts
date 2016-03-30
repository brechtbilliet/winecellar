import {Reducer, Action} from "@ngrx/store";
import {CONTAINER_WINESEARCH_UPDATE_FOUND_WINES, CONTAINER_WINESEARCH_CLEAR_FOUND_WINES} from "../../actionTypes";
import {INITIAL_STATE} from "../../state/initialState";
import {WineSearchContainerState} from "../../state/ContainersState";
export const wineSearchReducer: Reducer<WineSearchContainerState> =
    (state: WineSearchContainerState = INITIAL_STATE.containers.wineSearch,
     action: Action = null) => {
        switch (action.type) {
            case CONTAINER_WINESEARCH_UPDATE_FOUND_WINES:
                return <WineSearchContainerState> Object.assign({}, state, {
                    foundWines: action.payload
                });
            case CONTAINER_WINESEARCH_CLEAR_FOUND_WINES:
                return <WineSearchContainerState> Object.assign({}, state, {
                    foundWines: []
                });
            default:
                return state;
        }
    };