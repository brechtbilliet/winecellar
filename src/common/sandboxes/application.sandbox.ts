import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";
import {ApplicationState} from "../state/ApplicationState";
import {AuthenticationResource} from "../../authentication/resources/authentication.resource";
import {WineResource} from "../../stock/resources/wine.resource";
import {Store} from "@ngrx/store";
import {Account} from "../../authentication/types/Account";
@Injectable()
export class ApplicationSandbox {
    public isAuthenticated$: Observable<boolean> =
        this.store.select((state: ApplicationState) => state.data.authentication.isAuthenticated);
    public isBusy$: Observable<boolean> =
        this.store.select((state: ApplicationState) => state.containers.application.isBusy);
    public account$: Observable<Account> = this.store.select((state: ApplicationState) => state.data.authentication.account);

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