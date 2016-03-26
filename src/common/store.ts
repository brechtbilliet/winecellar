import {collapsableSidebarReducer} from "./reducers/containers/collapsableSidebarReducer";
import {authenticationReducer} from "./reducers/data/authenticationReducer";
import {winesReducer} from "./reducers/data/winesReducer";
import {editWineReducer} from "./reducers/containers/editWineReducer";
import {applicationReducer} from "./reducers/containers/applicationReducer";
import {wineSearchReducer} from "./reducers/containers/wineSearchReducer";
import {IDataState} from "./state/DataState";
import {ContainersState} from "./state/ContainersState";
import {INITIAL_STATE} from "./state/initialState";

function dataReducer(state: IDataState = INITIAL_STATE.data, action: any = null): IDataState {
    state.authentication = authenticationReducer(state.authentication, action);
    state.wines = winesReducer(state.wines, action);
    return state;
}
function containersReducer(state: ContainersState = INITIAL_STATE.containers,
                           action: any = null): ContainersState {
    state.editWinePage = editWineReducer(state.editWinePage, action);
    state.collapsableSidebar = collapsableSidebarReducer(state.collapsableSidebar, action);
    state.application = applicationReducer(state.application, action);
    state.wineSearch = wineSearchReducer(state.wineSearch, action);
    return state;
}
export const store: any = {
    data: dataReducer,
    containers: containersReducer
};