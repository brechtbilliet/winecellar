import {Action} from "@ngrx/store";
import {AuthenticationDataState} from "../../state/DataState";
import {DATA_AUTHENTICATION_SET_AUTHENTICATION, DATA_AUTHENTICATION_CLEAR_AUTHENTICATION} from "../../actionTypes";
import {AuthenticationResult} from "../../../authentication/types/AuthenticationResult";

let initialState = {
    isAuthenticated: false,
    jwtToken: "",
    account: null
}
export function authenticationReducer(state: AuthenticationDataState = initialState,
                                      action: Action = null): AuthenticationDataState {
    switch (action.type) {
        case DATA_AUTHENTICATION_SET_AUTHENTICATION:
            let payload: AuthenticationResult = action.payload;
            return {
                isAuthenticated: true,
                jwtToken: payload.token,
                account: {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    login: payload.login
                }
            };
        case DATA_AUTHENTICATION_CLEAR_AUTHENTICATION:
            return {
                isAuthenticated: false,
                jwtToken: null,
                account: null
            };
        default:
            return state;
    }
};