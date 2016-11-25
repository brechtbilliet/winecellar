import {type} from "../../util/util";
import {Action} from "@ngrx/store";
import {AuthenticationResult} from "../../../authentication/types/AuthenticationResult";
export const ActionTypes = {
    SET_AUTHENTICATION: type("[authentication] setAuthentication"),
    CLEAR_AUTHENTICATION: type("[authentication] clearAuthentication")
}

export class SetAuthentication implements Action {
    type = ActionTypes.SET_AUTHENTICATION;
    payload: {authenticationResult: AuthenticationResult};

    public constructor(authenticationResult: AuthenticationResult) {
        this.payload = {authenticationResult};
    }
}

export class ClearAuthentication implements Action {
    type = ActionTypes.CLEAR_AUTHENTICATION;

    public constructor() {}
}

export type Actions =
    SetAuthentication
        | ClearAuthentication;
