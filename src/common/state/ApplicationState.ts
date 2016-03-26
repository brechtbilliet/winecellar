import {ContainersState} from "./ContainersState";
import {IDataState} from "./DataState";
export interface ApplicationState {
    containers: ContainersState;
    data: IDataState;
}