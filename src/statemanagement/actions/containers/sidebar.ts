import {type} from "../../util/util";
import {Action} from "@ngrx/store";
export const ActionTypes = {
    TOGGLE_SIDEBAR: type("CONTAINER_COLLAPSABLESIDEBAR_TOGGLE")
}

export class ToggleSidebar implements Action {
    type = ActionTypes.TOGGLE_SIDEBAR;

    public constructor() {}
}

export type Actions =
    ToggleSidebar;
