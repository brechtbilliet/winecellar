import {type} from "../../util/util";
import {Action} from "@ngrx/store";
export const ActionTypes = {
    ENABLE_BUSY_FLAG: type("CONTAINER_APPLICATION_ENABLE_BUSY_FLAG"),
    DISABLE_BUSY_FLAG: type("CONTAINER_APPLICATION_DISABLE_BUSY_FLAG"),
};

export class EnableBusyFlag implements Action {
    type = ActionTypes.ENABLE_BUSY_FLAG;

    public constructor() {
    }
}

export class DisableBusyFlag implements Action {
    type = ActionTypes.DISABLE_BUSY_FLAG;

    public constructor() {
    }
}

export type Actions
    = EnableBusyFlag
    | DisableBusyFlag;