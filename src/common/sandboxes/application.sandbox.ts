import {Injectable} from "@angular/core";
import {ApplicationState} from "../state/ApplicationState";
import {Store} from "@ngrx/store";
import {WineService} from "../../stock/services/wine.service";
import {AuthenticationService} from "../../authentication/services/authentication.service";
@Injectable()
export class ApplicationSandbox {
    public isAuthenticated$ = this.store.select(state => state.data.authentication.isAuthenticated);
    public isBusy$ = this.store.select(state => state.containers.application.isBusy);
    public account$ = this.store.select(state => state.data.authentication.account);

    constructor(private store: Store<ApplicationState>, private authenticationService: AuthenticationService,
                private wineService: WineService) {
    }

    public loadAuthentication(): void {
        this.authenticationService.checkInitialAuthentication();
    }

    public logout(): void {
        this.authenticationService.logout();
    }

    public loadWines(): void {
        this.wineService.load();
    }
}