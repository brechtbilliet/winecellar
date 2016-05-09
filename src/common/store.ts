import {collapsableSidebarReducer} from "./reducers/containers/collapsableSidebarReducer";
import {authenticationReducer} from "./reducers/data/authenticationReducer";
import {winesReducer} from "./reducers/data/winesReducer";
import {applicationReducer} from "./reducers/containers/applicationReducer";
import {IDataState} from "./state/DataState";
import {ContainersState} from "./state/ContainersState";
import {INITIAL_STATE} from "./state/initialState";
import {editStockReducer} from "./reducers/containers/editStockReducer";

function dataReducer(state: IDataState = INITIAL_STATE.data, action: any = null): IDataState {
    state.authentication = authenticationReducer(state.authentication, action);
    state.wines = winesReducer(state.wines, action);
    return state;
}
function containersReducer(state: ContainersState = INITIAL_STATE.containers,
                           action: any = null): ContainersState {
    state.editStockPage = editStockReducer(state.editStockPage, action);
    state.collapsableSidebar = collapsableSidebarReducer(state.collapsableSidebar, action);
    state.application = applicationReducer(state.application, action);
    return state;
}
export const store: any = {
    data: dataReducer,
    containers: containersReducer
};