import {Wine} from "../../stock/entities/Wine";
import {Account} from "../../authentication/types/Account";

export interface IDataState {
    authentication: AuthenticationDataState;
    wines: Array<Wine>;
}

export interface AuthenticationDataState {
    isAuthenticated: boolean;
    jwtToken: string;
    account: Account;
}