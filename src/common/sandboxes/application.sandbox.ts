import {Injectable} from "@angular/core";
import {ApplicationState} from "../state/ApplicationState";
import {AuthenticationResource} from "../../authentication/resources/authentication.resource";
import {WineResource} from "../../stock/resources/wine.resource";
import {Store} from "@ngrx/store";
@Injectable()
export class ApplicationSandbox {
    public isAuthenticated$ = this.store.select(state => state.data.authentication.isAuthenticated);
    public isBusy$ = this.store.select(state => state.containers.application.isBusy);
    public account$ = this.store.select(state => state.data.authentication.account);

    constructor(private store: Store<ApplicationState>, private authenticationResource: AuthenticationResource,
                private wineResource: WineResource) {
    }

    public loadAuthentication(): void {
        this.authenticationResource.checkInitialAuthentication();
    }

    public logout(): void {
        this.authenticationResource.logout();
    }

    public loadWines(): void {
        this.wineResource.load();
    }
}