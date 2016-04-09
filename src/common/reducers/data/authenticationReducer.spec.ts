import {DATA_AUTHENTICATION_SET_AUTHENTICATION, DATA_AUTHENTICATION_CLEAR_AUTHENTICATION} from "../../actionTypes";
import {it, describe, expect} from "angular2/testing";
import {authenticationReducer} from "./authenticationReducer";
import {AuthenticationDataState} from "../../state/DataState";
import {INITIAL_STATE} from "../../state/initialState";
describe("reducer: data > authenticationReducer", () => {
    describe("case DATA_AUTHENTICATION_SET_AUTHENTICATION", () => {
        it("should return a new instance with the correct state", () => {
            let initialState: AuthenticationDataState = INITIAL_STATE.data.authentication;
            let payload: any = {token: "token", firstName: "firstname", lastName: "lastname", login: "login"};
            let changedState: AuthenticationDataState =
                authenticationReducer(initialState, {type: DATA_AUTHENTICATION_SET_AUTHENTICATION, payload});
            expect(changedState).not.toBe(initialState);
            expect(changedState.jwtToken).toEqual(payload.token);
            expect(changedState.account.firstName).toEqual(payload.firstName);
            expect(changedState.account.lastName).toEqual(payload.lastName);
            expect(changedState.account.login).toEqual(payload.login);
        });
    });
    describe("case DATA_AUTHENTICATION_CLEAR_AUTHENTICATION", () => {
        it("should return a new instance with the state cleared", () => {
            let initialState: AuthenticationDataState = {
                isAuthenticated: true,
                jwtToken: "token",
                account: {
                    firstName: "firstName",
                    lastName: "lastName",
                    login: "login"
                }
            };
            let changedState: AuthenticationDataState =
                authenticationReducer(initialState, {type: DATA_AUTHENTICATION_CLEAR_AUTHENTICATION});
            expect(changedState).not.toBe(initialState);
            expect(changedState.isAuthenticated).toBe(false);
        });
    });
    describe("case default", () => {
        it("should return the same state", () => {
            let initialState: AuthenticationDataState = {
                isAuthenticated: true,
                jwtToken: "token",
                account: {
                    firstName: "firstName",
                    lastName: "lastName",
                    login: "login"
                }
            };
            let changedState: AuthenticationDataState = authenticationReducer(initialState, {type: null});
            expect(changedState).toBe(initialState);
        });
    });
});