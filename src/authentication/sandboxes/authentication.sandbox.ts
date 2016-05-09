import {Injectable} from "angular2/core";
import {AuthenticationResource} from "../resources/authentication.resource";
import {Credentials} from "../types/Credentials";
import {Account} from "../types/Account";

@Injectable()
export class AuthenticationSandbox {
    constructor(private authenticationResource: AuthenticationResource) {
    }

    public login(credentials: Credentials): void {
        this.authenticationResource.authenticate(credentials);
    }

    public register(account: Account): void {
        this.authenticationResource.register(account);
    }
}