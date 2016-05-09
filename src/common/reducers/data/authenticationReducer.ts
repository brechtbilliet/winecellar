import {Reducer, Action} from "@ngrx/store";
import {INITIAL_STATE} from "../../state/initialState";
import {AuthenticationDataState} from "../../state/DataState";
import {DATA_AUTHENTICATION_CLEAR_AUTHENTICATION, DATA_AUTHENTICATION_SET_AUTHENTICATION} from "../../actionTypes";
import {AuthenticationResult} from "../../../authentication/types/AuthenticationResult";
export const authenticationReducer: Reducer<AuthenticationDataState> =
    (state: AuthenticationDataState = INITIAL_STATE.data.authentication,
     action: Action = null) => {
        switch (action.type) {
            case DATA_AUTHENTICATION_SET_AUTHENTICATION:
                let payload: AuthenticationResult = action.payload;
                return <AuthenticationDataState> Object.assign({}, state, {
                    isAuthenticated: true,
                    jwtToken: payload.token,
                    account: {
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        login: payload.login
                    }
                });
            case DATA_AUTHENTICATION_CLEAR_AUTHENTICATION:
                return <AuthenticationDataState> Object.assign({}, state, {
                    isAuthenticated: false,
                    jwtToken: null,
                    account: null
                });
            default:
                return state;
        }
    }
