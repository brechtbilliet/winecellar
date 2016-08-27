import {ContainersState} from "./ContainersState";
import {DataState} from "./DataState";
export interface ApplicationState {
    containers: ContainersState;
    data: DataState;
}