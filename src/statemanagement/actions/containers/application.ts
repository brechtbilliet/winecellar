import {type} from "../../util/util";
import {Action} from "@ngrx/store";
export const ActionTypes = {
    ENABLE_BUSY_FLAG: type("[Application] EnableBusyFlag"),
    DISABLE_BUSY_FLAG: type("[Application] DisableBusyFlag"),
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
