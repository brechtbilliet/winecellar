import {Action} from "@ngrx/store";
import {AuthenticationDataState} from "../../state/DataState";
import {DATA_AUTHENTICATION_SET_AUTHENTICATION, DATA_AUTHENTICATION_CLEAR_AUTHENTICATION} from "../../actionTypes";
import {AuthenticationResult} from "../../../authentication/types/AuthenticationResult";

let initialState: AuthenticationDataState = {
    isAuthenticated: false,
    jwtToken: undefined,
    account: undefined
}

export function authenticationReducer(state: AuthenticationDataState = initialState,
                                      action: Action): AuthenticationDataState {
    let token: string, firstName: string, lastName: string, login: string;
    switch (action.type) {
        case DATA_AUTHENTICATION_SET_AUTHENTICATION:
            ({token, firstName, lastName, login} = action.payload);
            return {
                isAuthenticated: true,
                jwtToken: token,
                account: {
                    firstName: firstName,
                    lastName: lastName,
                    login: login
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