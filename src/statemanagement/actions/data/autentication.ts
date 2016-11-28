import {type} from "../../util/util";
import {Action} from "@ngrx/store";
import {AuthenticationResult} from "../../../authentication/types/AuthenticationResult";
export const ActionTypes = {
    SET_AUTHENTICATION: type("DATA_AUTHENTICATION_SET_AUTHENTICATION"),
    CLEAR_AUTHENTICATION: type("DATA_AUTHENTICATION_CLEAR_AUTHENTICATION")
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
