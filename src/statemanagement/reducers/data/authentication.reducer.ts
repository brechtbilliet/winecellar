import {AuthenticationDataState} from "../../state/DataState";
import {AuthenticationResult} from "../../../authentication/types/AuthenticationResult";
import * as authentication from "../../actions/data/autentication";

let initialState = {
    isAuthenticated: false,
    jwtToken: "",
    account: null
}
export function authenticationReducer(state: AuthenticationDataState = initialState,
                                      action: authentication.Actions): AuthenticationDataState {
    switch (action.type) {
        case authentication.ActionTypes.SET_AUTHENTICATION:
            let authenticationResult: AuthenticationResult = action.payload.authenticationResult;
            return {
                isAuthenticated: true,
                jwtToken: authenticationResult.token,
                account: {
                    firstName: authenticationResult.firstName,
                    lastName: authenticationResult.lastName,
                    login: authenticationResult.login
                }
            };
        case authentication.ActionTypes.CLEAR_AUTHENTICATION:
            return {
                isAuthenticated: false,
                jwtToken: null,
                account: null
            };
        default:
            return state;
    }
};